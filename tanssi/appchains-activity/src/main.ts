import { TypeormDatabase } from '@subsquid/typeorm-store';
import { processor } from './processor';
import { AppchainActivity } from './model';
import { events } from './types';
import * as ss58 from '@subsquid/ss58';
import { paraIdRegistered } from './types/registrar/events';
import { In } from 'typeorm';

processor.run(new TypeormDatabase(), async (ctx) => {
  const activity: AppchainActivity[] = [];

  // Go through the batch to get the paraIds to pre-load

  const registeredParaIds = new Set();
  for (const block of ctx.blocks) {
    for (const event of block.events) {
      if (event.name === events.registrar.paraIdValidForCollating.name ||
        event.name === events.registrar.paraIdDeregistered.name) {

        if (events.registrar.paraIdValidForCollating.v101.is(event)) {
          const { paraId } = events.registrar.paraIdValidForCollating.v101.decode(event);
          registeredParaIds.add(paraId);
        }
        else {
          const { paraId } = events.registrar.paraIdDeregistered.v101.decode(event);
          registeredParaIds.add(paraId);
        }
      }
    }
  }

  // Pre-load the records from the db using an elegant and performant In clause

  const registeredAppchains: Map<number, AppchainActivity> = new Map(
      // batch-load using IN operator
    (await ctx.store.findBy(AppchainActivity, { paraId: In([...registeredParaIds]) }))
      .map((entity) => [entity.paraId, entity])
  );

  // Update the entries or create a new one in case of a registration

  for (const block of ctx.blocks) {
    for (const event of block.events) {
      if (event.name === events.registrar.paraIdValidForCollating.name ||
        event.name === events.registrar.paraIdDeregistered.name) {

        if (events.registrar.paraIdValidForCollating.v101.is(event)) {
          const { paraId } = events.registrar.paraIdValidForCollating.v101.decode(event);
          let registeredAppchain = registeredAppchains.get(paraId)!;

          registeredAppchain.launchBlockNumber = block.header.height;
          registeredAppchain.launchTimestamp = `${block.header.timestamp}`;
        }
        else {
          const { paraId } = events.registrar.paraIdDeregistered.v101.decode(event);
          let registeredAppchain = registeredAppchains.get(paraId)!;

          registeredAppchain.decommissionBlockNumber = block.header.height;
          registeredAppchain.decommissionTimestamp = `${block.header.timestamp}`;
        }
      }
      else {
        const { paraId } = events.registrar.paraIdRegistered.v101.decode(event);
          const sender = ss58
            .codec('substrate')
            .encode(event.call?.origin.value.value);

          registeredAppchains.set(paraId, 
            new AppchainActivity({
              id: event.id,
              paraId,
              sender,
              registrationBlockNumber: block.header.height,
              registrationTimestamp: `${block.header.timestamp}`
            })
          );
      }
    }
  }

  // ta-da!
  await ctx.store.upsert([...registeredAppchains.values()]);
});
