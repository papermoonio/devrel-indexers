import { TypeormDatabase, Store } from '@subsquid/typeorm-store';
import { In } from 'typeorm';
import { processor, ProcessorContext } from './processor';
import { Account, Delegation, Undelegation } from './model';
import { events } from './types';

type Tuple<T, K> = [T, K];
interface EventsInfo {
  delegations: Tuple<Delegation, string>[];
  undelegations: Tuple<Undelegation, string>[];
  accountIds: Set<string>;
}

processor.run(new TypeormDatabase(), async (ctx) => {
  const eventsInfo = getEventsInfo(ctx);

  let accounts = await ctx.store
    .findBy(Account, { id: In([...eventsInfo.accountIds]) })
    .then((accounts) => new Map(accounts.map((a) => [a.id, a])));

  for (let delEvent of eventsInfo.accountIds) {
    if (!accounts.has(delEvent)) {
      accounts.set(delEvent, new Account({ id: delEvent }));
    }
  }

  for (const del of eventsInfo.delegations) {
    // necessary to add this field to the previously created model
    // because now we have the Account created.
    del[0].account = accounts.get(del[1]) as Account;
  }
  for (const delLeft of eventsInfo.undelegations) {
    delLeft[0].account = accounts.get(delLeft[1]) as Account;
  }

  await ctx.store.save([...accounts.values()]);
  await ctx.store.insert(eventsInfo.delegations.map((el) => el[0]));
  await ctx.store.insert(eventsInfo.undelegations.map((el) => el[0]));
});

function getEventsInfo(ctx: ProcessorContext<Store>): EventsInfo {
  // Filters and decodes the arriving events
  let eventsInfo: EventsInfo = {
    delegations: [],
    undelegations: [],
    accountIds: new Set<string>(),
  };

  for (let block of ctx.blocks) {
    for (let event of block.events) {
      if (event.name == events.pooledStaking.executedDelegate.name) {
        if (events.pooledStaking.executedDelegate.v201.is(event)) {
          let { delegator, candidate } =
            events.pooledStaking.executedDelegate.v201.decode(event);

          eventsInfo.delegations.push([
            new Delegation({
              id: event.id,
              candidate: candidate,
              blockNo: event.block.height,
              timestamp: `${event.block.timestamp}`
            }),
            // Add delegator to the set of unique accounts
            delegator,
          ]);
          eventsInfo.accountIds.add(delegator);
        }
      }
      if (event.name == events.pooledStaking.executedUndelegate.name) {
        if (events.pooledStaking.executedUndelegate.v201.is(event)) {
          let { delegator, candidate } =
            events.pooledStaking.executedUndelegate.v201.decode(event);

          eventsInfo.undelegations.push([
            new Undelegation({
              id: event.id,
              candidate: candidate,
              blockNo: event.block.height,
              timestamp: `${event.block.timestamp}`
            }),
            // Add delegator to the set of unique accounts
            delegator,
          ]);
          eventsInfo.accountIds.add(delegator);
        }
      }
    }
  }
  return eventsInfo;
}
