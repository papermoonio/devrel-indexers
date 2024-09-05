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
  .setGateway('https://v2.archive.subsquid.io/network/moonbeam-substrate')
  .setRpcEndpoint({
    url: assertNotNull('wss://moonbeam.unitedbloc.com/'),
    rateLimit: 30,
  })
  .setBlockRange({ from: 7303601, to: 7322088 })
  .addEvent({
    name: [events.messageQueue.processed.name],
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
