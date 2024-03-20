import { TypeormDatabase } from '@subsquid/typeorm-store';
import { processor } from './processor';
import { ParachainIdRegistration } from './model';
import { events } from './types';
import * as ss58 from '@subsquid/ss58'

processor.run(new TypeormDatabase(), async (ctx) => {
  const registrations: ParachainIdRegistration[] = [];

  for (const block of ctx.blocks) {
    for (let event of block.events) {
      if (event.name === events.registrar.paraIdRegistered.name) {
        if (events.registrar.paraIdRegistered.v101.is(event)) {
          const { paraId } = events.registrar.paraIdRegistered.v101.decode(event);
          const sender = ss58.codec('substrate').encode(event.call?.origin.value.value)

          registrations.push(
            new ParachainIdRegistration({
              id: event.id,
              blockNo: block.header.height,
              timestamp: `${block.header.timestamp}`,
              paraId,
              sender
            })
          )
        }
      }
    }
  }

  await ctx.store.insert(registrations);
});
