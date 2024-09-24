import { TypeormDatabase } from '@subsquid/typeorm-store';
import { processor } from './processor';
import { AppchainActivity } from './model';
import { events } from './types';
import * as ss58 from '@subsquid/ss58';
import { paraIdRegistered } from './types/registrar/events';
import { In } from 'typeorm';

processor.run(new TypeormDatabase(), async (ctx) => {
  const activity: AppchainActivity[] = [];


  //

  const registeredParaIds = new Set()
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

  const registeredAppchains: Map<string, AppchainActivity> = new Map(
      // batch-load using IN operator
    (await ctx.store.findBy(AppchainActivity, { id: In([...registeredParaIds]) }))
      // put the result into the ID map
      .map((entity) => [entity.id, entity])
  );

  // calculate the updated state of the entities
  for (const block of ctx.blocks) {
    for (const event of block.events) {
      if (event.name === events.registrar.paraIdValidForCollating.name ||
        event.name === events.registrar.paraIdDeregistered.name) {

        if (events.registrar.paraIdValidForCollating.v101.is(event)) {
          const { paraId } = events.registrar.paraIdValidForCollating.v101.decode(event);
          let registeredAppchain = registeredAppchains.get(paraId.toString())!;

          registeredAppchain.launchBlockNumber = block.header.height;
          registeredAppchain.launchTimestamp = `${block.header.timestamp}`;
        }
        else {
          const { paraId } = events.registrar.paraIdDeregistered.v101.decode(event);
          let registeredAppchain = registeredAppchains.get(paraId.toString())!;

          registeredAppchain.decommissionBlockNumber = block.header.height;
          registeredAppchain.decommissionTimestamp = `${block.header.timestamp}`;
        }
      }
      else {
        const { paraId } = events.registrar.paraIdRegistered.v101.decode(event);
          const sender = ss58
            .codec('substrate')
            .encode(event.call?.origin.value.value);

          registeredAppchains.set(paraId.toString(), 
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

    // batch-update all entities in the map
  await ctx.store.save([...registeredAppchains.values()]);
});
