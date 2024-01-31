import { TypeormDatabase, Store } from '@subsquid/typeorm-store';
import {
  CustomRepositoryCannotInheritRepositoryError,
  EventsDescription,
  In,
} from 'typeorm';
import * as ss58 from '@subsquid/ss58';

import { processor, ProcessorContext } from './processor';
import { Transfer } from './model';
import { events } from './types';
import { V3Outcome } from './types/v1000000';

processor.run(new TypeormDatabase(), async (ctx) => {
  let transferEvents: TransferEvent[] = getTransferEvents(ctx);

  let transfers: Transfer[] = createTransfers(transferEvents);

  await ctx.store.insert(transfers);
});

interface TransferEvent {
  id: string;
  blockNumber: number;
  from: string;
  to: string;
  amount: bigint;
}

function getTransferEvents(ctx: ProcessorContext<Store>): TransferEvent[] {
  // Filters and decodes the arriving events
  let transfers: TransferEvent[] = [];
  for (let block of ctx.blocks) {
    for (let event of block.events) {
      // Handle Kusama to Moonriver Case
      if (event.name == events.xcmPallet.attempted.name) {
        let result: { outcome: V3Outcome };
        if (events.xcmPallet.attempted.v1000000.is(event)) {
          result = events.xcmPallet.attempted.v1000000.decode(event);
        } else {
          throw new Error('Unsupported spec');
        }

        if (result.outcome.__kind === 'Incomplete') {
          const eventID = event.id.split('-').slice(0, 2).join('-');
          let balanceTransferEvent;

          for (let associatedEvent of block.events) {
            const associatedEventID = associatedEvent.id
              .split('-')
              .slice(0, 2)
              .join('-');
            if (
              associatedEvent.name === 'Balances.Transfer' &&
              eventID === associatedEventID &&
              ss58.codec('kusama').encode(associatedEvent.args.to) ===
                'F7fq1jSB3w59f8vMShxvP5eSu3wCJbL5Am5MQ6vP6VzYLWD'
            ) {
              balanceTransferEvent = associatedEvent;
              break;
            }
          }

          if (balanceTransferEvent) {
            transfers.push({
              id: event.id,
              blockNumber: block.header.height,
              from: ss58.codec('kusama').encode(balanceTransferEvent.args.from),
              to: ss58.codec('kusama').encode(balanceTransferEvent.args.to),
              amount: balanceTransferEvent.args.amount,
            });
          }
        }
      } else if (event.name == events.messageQueue.processed.name) {
        let result;
        if (events.messageQueue.processed.v9430.is(event)) {
          result = events.messageQueue.processed.v9430.decode(event);

          if (!result.success) {
            // Get MessageQueue Event ID:
            const eventID = event.id.split('-').slice(0, 2).join('-');
            let balanceDepositEvent;
            for (let associatedEvent of block.events) {
              const associatedEventID = associatedEvent.id
                .split('-')
                .slice(0, 2)
                .join('-');
              if (
                associatedEvent.name === 'Balances.Deposit' &&
                eventID === associatedEventID &&
                ss58.codec('kusama').encode(associatedEvent.args.who) ===
                  'F7fq1jSB3w59f8vMShxvP5eSu3wCJbL5Am5MQ6vP6VzYLWD'
              ) {
                balanceDepositEvent = associatedEvent;
                break;
              }
            }

            if (balanceDepositEvent) {
              transfers.push({
                id: event.id,
                blockNumber: block.header.height,
                from: 'NULL',
                to: ss58.codec('kusama').encode(balanceDepositEvent.args.who),
                amount: balanceDepositEvent.args.amount,
              });
            }
          }
        } else {
          throw new Error('Unsupported spec');
        }
      }
    }
  }
  return transfers;
}

function createTransfers(transferEvents: TransferEvent[]): Transfer[] {
  let transfers: Transfer[] = [];
  for (let t of transferEvents) {
    let { id, blockNumber, from, to, amount } = t;
    transfers.push(
      new Transfer({
        id,
        blockNumber,
        from,
        to,
        amount,
      })
    );
  }
  return transfers;
}
