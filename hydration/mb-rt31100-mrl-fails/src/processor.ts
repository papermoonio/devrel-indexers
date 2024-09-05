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
  .setGateway('https://v2.archive.subsquid.io/network/hydradx')
  .setRpcEndpoint({
    url: assertNotNull('wss://hydradx-rpc.dwellir.com'),
    rateLimit: 10,
  })
  //.setBlockRange({ from: 5910874, to: 5919541 })
  .setBlockRange({ from: 5909911, to: 5919541 })
  .addEvent({
    name: [events.xcmpQueue.xcmpMessageSent.name],
    extrinsic: true,
  })
  .addEvent({
    name: [events.xTokens.transferredAssets.name],
    extrinsic: true,
  })
  .setFields({
    event: {
      name: true,
    },
  });

export type Fields = SubstrateBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Event = _Event<Fields>;
export type Call = _Call<Fields>;
export type Extrinsic = _Extrinsic<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
