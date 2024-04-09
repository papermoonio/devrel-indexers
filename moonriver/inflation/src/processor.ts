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
import { lookupArchive } from '@subsquid/archive-registry'
import { events } from './types';

export const processor = new SubstrateBatchProcessor()
  .setGateway(lookupArchive('moonriver', {type: 'Substrate'}))
  .setRpcEndpoint({
    url: assertNotNull(process.env.RPC_ENDPOINT),
    rateLimit: 10000
  })
  .setBlockRange({ from: 4794222 }) // Start from Aug 1
  .addEvent({
    name: [
      events.parachainStaking.rewarded.name,
      events.parachainStaking.reservedForParachainBond.name,
      events.treasury.deposit.name,
      events.moonbeamOrbiters.orbiterRewarded.name
    ],
  })
  .setFields({
    block: {
      timestamp: true
    }
  })


export type Fields = SubstrateBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Event = _Event<Fields>;
export type Call = _Call<Fields>;
export type Extrinsic = _Extrinsic<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
