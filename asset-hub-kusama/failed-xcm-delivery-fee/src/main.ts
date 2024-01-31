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
  assetID: number;
}

function getTransferEvents(ctx: ProcessorContext<Store>): TransferEvent[] {
  // Filters and decodes the arriving events
  let transfers: TransferEvent[] = [];
  for (let block of ctx.blocks) {
    for (let event of block.events) {
      if (event.name == events.polkadotXcm.attempted.name) {
        let result: { outcome: V3Outcome };
        if (events.polkadotXcm.attempted.v1000000.is(event)) {
          result = events.polkadotXcm.attempted.v1000000.decode(event);
        } else {
          throw new Error('Unsupported spec');
        }

        if (result.outcome.__kind === 'Incomplete') {
          const eventID = event.id.split('-').slice(0, 2).join('-');
          let assetTransferredEvent;

          for (let associatedEvent of block.events) {
            const associatedEventID = associatedEvent.id
              .split('-')
              .slice(0, 2)
              .join('-');
            if (
              associatedEvent.name === 'Assets.Transferred' &&
              eventID === associatedEventID &&
              ss58.codec('kusama').encode(associatedEvent.args.to) ===
                'FBeL7EFFn7yHFs4uSf432RThNjEuieS8pQWcMdRFpXZPqkW'
            ) {
              assetTransferredEvent = associatedEvent;
              break;
            }
          }

          if (assetTransferredEvent) {
            transfers.push({
              id: event.id,
              blockNumber: block.header.height,
              from: ss58
                .codec('kusama')
                .encode(assetTransferredEvent.args.from),
              to: ss58.codec('kusama').encode(assetTransferredEvent.args.to),
              amount: assetTransferredEvent.args.amount,
              assetID: assetTransferredEvent.args.assetId,
            });
          }
        }
      }
    }
  }
  return transfers;
}

function createTransfers(transferEvents: TransferEvent[]): Transfer[] {
  let transfers: Transfer[] = [];
  for (let t of transferEvents) {
    let { id, blockNumber, from, to, amount, assetID } = t;
    transfers.push(
      new Transfer({
        id,
        blockNumber,
        from,
        to,
        amount,
        assetID,
      })
    );
  }
  return transfers;
}
