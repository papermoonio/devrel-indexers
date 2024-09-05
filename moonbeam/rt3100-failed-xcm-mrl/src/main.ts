import { TypeormDatabase, Store } from '@subsquid/typeorm-store';
import { processor, ProcessorContext } from './processor';
import { XCM } from './model';
import { events } from './types';

processor.run(new TypeormDatabase(), async (ctx) => {
  let xcmEvents: xcmEvent[] = getXCMEvents(ctx);

  let XCMs: XCM[] = createXCMs(xcmEvents);

  await ctx.store.insert(XCMs);
});

interface xcmEvent {
  id: string;
  chain: number;
  hash: string;
}

function getXCMEvents(ctx: ProcessorContext<Store>): xcmEvent[] {
  // Filters and decodes the arriving events
  let xcmEvent: xcmEvent[] = [];
  for (let block of ctx.blocks) {
    for (let event of block.events) {
      if (event.name == events.messageQueue.processed.name) {
        let result;
        if (events.messageQueue.processed.v2901.is(event)) {
          result = events.messageQueue.processed.v2901.decode(event);
        } else {
          throw new Error('Unsupported spec');
        }

        if (!result.success) {
          if (result.origin.__kind === 'Sibling') {
            xcmEvent.push({
              id: event.id,
              chain: result.origin.value,
              hash: result.id,
            });
          }
        }
      }
    }
  }
  return xcmEvent;
}

function createXCMs(xcmEvents: xcmEvent[]): XCM[] {
  let XCMs: XCM[] = [];
  for (let x of xcmEvents) {
    let { id, chain, hash } = x;

    XCMs.push(
      new XCM({
        id,
        chain,
        hash,
      })
    );
  }
  return XCMs;
}
