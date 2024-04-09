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

export const processor = new SubstrateBatchProcessor()
  .setDataSource({
    chain: {
      url: assertNotNull(process.env.RELAY_RPC_ENDPOINT),
      rateLimit: 100000,
    },
  })
  .setBlockRange({ from: 14726450 })
  .addCall({
    name: [
      // Get extrinsic failed and success events (since they're not included in call events)
      "Registrar.register"
    ],
    events: true
  })
  .setFields({
    call: {
      origin: true, // Get the sender of the call
      success: true
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
