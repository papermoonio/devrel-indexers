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
import { events } from '../types';

export const processor = new SubstrateBatchProcessor()
  .setDataSource({
    chain: {
      url: assertNotNull('https://fraa-dancebox-3092-rpc.a.dancebox.tanssi.network'),
      rateLimit: 10000,
    },
  })
  .setBlockRange({ from: 0 })
  .addCall({
    extrinsic: true, // Get all extrinsics so we can grab the hash and the success fields
    events: true, // Get all events so we can look at events like Ethereum.Executed, etc.
  })
  .addEvent({
    name: [
      // Get extrinsic failed and success events (since they're not included in call events)
      events.system.extrinsicFailed.name,
      events.system.extrinsicSuccess.name,
    ],
  })
  .setFields({
    extrinsic: {
      hash: true, // Grab extrinsic hash
      success: true, // Grab result for Substrate extrinsics
    },
    call: {
      origin: true, // Get the sender of the call
    },
    block: {
      timestamp: true
    }
  });

export type Fields = SubstrateBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Event = _Event<Fields>;
export type Call = _Call<Fields>;
export type Extrinsic = _Extrinsic<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
