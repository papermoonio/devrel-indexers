import { assertNotNull } from '@subsquid/util-internal';
import { lookupArchive } from '@subsquid/archive-registry';
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
    // Lookup archive by the network name in Subsquid registry
    // See https://docs.subsquid.io/substrate-indexing/supported-networks/
    archive: lookupArchive('asset-hub-kusama', {
      type: 'Substrate',
      release: 'ArrowSquid',
    }),
    // Chain RPC endpoint is required on Substrate for metadata and real-time updates
    chain: {
      // Set via .env for local runs or via secrets when deploying to Subsquid Cloud
      // https://docs.subsquid.io/deploy-squid/env-variables/
      url: assertNotNull(process.env.RPC_ENDPOINT),
    },
  })
  .setBlockRange({ from: 6280000, to: 6319500 })
  .addEvent({
    name: [events.assets.transferred.name, events.polkadotXcm.attempted.name],
    extrinsic: true,
  })
  .setFields({
    event: {
      name: true,
    },
  });
// Uncomment to disable RPC ingestion and drastically reduce no of RPC calls
//.useArchiveOnly()

export type Fields = SubstrateBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Event = _Event<Fields>;
export type Call = _Call<Fields>;
export type Extrinsic = _Extrinsic<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
