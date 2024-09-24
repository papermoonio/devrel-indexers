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
  .setRpcEndpoint(assertNotNull(process.env.RPC_ENDPOINT))
  .setBlockRange({ from: 0 })
  .addEvent({
    name: [
      events.registrar.paraIdRegistered.name,
      events.registrar.paraIdValidForCollating.name,
      events.registrar.paraIdDeregistered.name,
    ],
    call: true
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
