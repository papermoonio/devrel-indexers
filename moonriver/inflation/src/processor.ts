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
import { lookupArchive } from '@subsquid/archive-registry';
import { events } from './types';

export const processor = new SubstrateBatchProcessor()
  .setGateway(lookupArchive('moonriver', { type: 'Substrate' }))
  .setRpcEndpoint({
    url: assertNotNull(process.env.RPC_ENDPOINT),
    rateLimit: 1000,
  })
  .setBlockRange({ from: 16085600, to: 16511539 }) // May 2026 report (expanded ±14400 blocks)
  .addEvent({
    name: [
      // Existing events
      events.parachainStaking.rewarded.name,
      events.parachainStaking.reservedForParachainBond.name,
      events.parachainStaking.inflationDistributed.name,
      events.treasury.deposit.name,
      events.moonbeamOrbiters.orbiterRewarded.name,
      events.balances.deposit.name,
      events.balances.withdraw.name,
      events.balances.transfer.name,
    ],
  })
  .setFields({
    block: {
      timestamp: true,
    },
  });

export type Fields = SubstrateBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Event = _Event<Fields>;
export type Call = _Call<Fields>;
export type Extrinsic = _Extrinsic<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
