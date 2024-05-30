import { assertNotNull } from '@subsquid/util-internal';
import {
  BlockHeader,
  DataHandlerContext,
  SubstrateBatchProcessor,
  SubstrateBatchProcessorFields,
  Event as _Event,
  Call as _Call,
  Extrinsic as _Extrinsic,
} from '@subsquid/substrate-processor';
import { events, calls } from './types';

export const processor = new SubstrateBatchProcessor()
  .setDataSource({
    chain: {
      url: assertNotNull(process.env.RPC_ENDPOINT),
      rateLimit: 10,
    },
  })
  .setBlockRange({ from: 0 })
  .addEvent({
    name: [
      // Get extrinsic failed and success events (since they're not included in call events)
      events.registrar.paraIdRegistered.name
    ],
    call: true
  })
  .addCall({
    name: [ calls.system.remark.name ]
  })
  .setFields({
    call: {
      origin: true, // Get the sender of the call
    },
    block: {
      timestamp: true // Get the timestamp of the block
    }
  });

export type Fields = SubstrateBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Event = _Event<Fields>;
export type Call = _Call<Fields>;
export type Extrinsic = _Extrinsic<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
