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
      url: assertNotNull(process.env.RPC_ENDPOINT),
      rateLimit: 10,
    },
  })
  .setBlockRange({ from: 0 })
  .addCall({ // Get all calls w/ their extrinsics, so we can grab the extrinsic hash
    extrinsic: true
  })
  .addEvent({
    name: [
      'System.ExtrinsicSuccess',
      'System.ExtrinsicFailed'
    ],
  }) // Get all events
  .setFields({
    extrinsic: {
      hash: true, // Grab extrinsic hash
    }
  })

export type Fields = SubstrateBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Event = _Event<Fields>;
export type Call = _Call<Fields>;
export type Extrinsic = _Extrinsic<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
