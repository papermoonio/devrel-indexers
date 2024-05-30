import { TypeormDatabase } from '@subsquid/typeorm-store';
import { processor } from './processor';
import { ParachainIdRegistration } from './model';
import { events, calls } from './types';
import * as ss58 from '@subsquid/ss58';

processor.run(new TypeormDatabase(), async (ctx) => {
  const registrations: ParachainIdRegistration[] = [];

  for (const block of ctx.blocks) {
    for (let event of block.events) {
      if (event.name === events.registrar.paraIdRegistered.name) {
        if (events.registrar.paraIdRegistered.v101.is(event)) {
          const { paraId } =
            events.registrar.paraIdRegistered.v101.decode(event);
          const sender = ss58
            .codec('substrate')
            .encode(event.call?.origin.value.value);

          registrations.push(
            new ParachainIdRegistration({
              id: event.id,
              blockNo: block.header.height,
              timestamp: `${block.header.timestamp}`,
              paraId,
              sender,
            })
          );
        }
      }
    }

    for (let call of block.calls) {
      if (call.name === calls.system.remark.name) {
        if (calls.system.remark.v101.is(call)) {
          const { remark } = calls.system.remark.v101.decode(call);
          const normalizedHexString = remark.startsWith('0x')
            ? remark.slice(2)
            : remark;
          const buffer = Buffer.from(normalizedHexString, 'hex');
          const text = buffer.toString('utf8');

          let jsonData;
          try {
            jsonData = JSON.parse(text);
            if (jsonData.action && jsonData.action == 'register') {
              registrations.push(
                new ParachainIdRegistration({
                  id: call.id,
                  blockNo: block.header.height,
                  timestamp: `${block.header.timestamp}`,
                  paraId: 0,
                  sender: jsonData.address,
                })
              );
            }
          } catch (error) {
            // Not valid JSON, don't process it
          }
        }
      }
    }
  }

  await ctx.store.insert(registrations);
});
