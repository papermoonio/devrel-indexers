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
import { events } from './types';

export const processor = new SubstrateBatchProcessor()
  .setDataSource({
    chain: {
      url: assertNotNull(process.env.RPC_ENDPOINT)
    },
  })
  .setBlockRange({ from: 273003 }) // Pooled Staking was introduced in RT 201
  .addEvent({
    name: [events.pooledStaking.executedDelegate.name],
  })

export type Fields = SubstrateBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Event = _Event<Fields>;
export type Call = _Call<Fields>;
export type Extrinsic = _Extrinsic<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
