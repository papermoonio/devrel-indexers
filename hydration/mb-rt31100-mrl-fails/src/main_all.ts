import { TypeormDatabase, Store } from '@subsquid/typeorm-store';
import { In } from 'typeorm';
import * as ss58 from '@subsquid/ss58';
import assert from 'assert';

import { processor, ProcessorContext } from './processor';
import { XCM } from './model';
import { events } from './types';
const dataMB = require('../../../moonbeam/rt3100-failed-xcm-mrl/output.json');
const assetMapping: { [key: string]: { name: string; id: number } } = {
  '0x06e605775296e851ff43b4daa541bb0984e9d6fd': {
    name: 'DAI',
    id: 18,
  },
  '0xe57ebd2d67b462e9926e04a8e33f01cd0d64346d': {
    name: 'WBTC',
    id: 19,
  },

  '0xab3f0245b83feb11d15aaffefd7ad465a59817ed': {
    name: 'WETH',
    id: 20,
  },
  '0x931715fee2d06333043d11f658c8ce934ac61d0c': {
    name: 'USDC',
    id: 21,
  },

  '0xc30e9ca94cf52f3bf5692aacf81353a27052c46f': {
    name: 'USDT',
    id: 23,
  },
};

interface xcmEvent {
  id: string;
  hash: string;
  sender: string;
  dest: number;
  asset: string;
  amount: bigint;
  assetIDHDX: number;
  assetName: string;
}

interface DataMB {
  chain: number;
  hash: string;
  id: string;
}

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  let xcmEvents: xcmEvent[] = getXCMEvents(ctx);

  let XCMs: XCM[] = createXCMs(xcmEvents);

  await ctx.store.insert(XCMs);
});

function getXCMEvents(ctx: ProcessorContext<Store>): xcmEvent[] {
  // Filters and decodes the arriving events
  let xcmEvent: xcmEvent[] = [];
  for (let block of ctx.blocks) {
    for (let event of block.events) {
      if (event.name == events.xcmpQueue.xcmpMessageSent.name) {
        let result;
        if (events.xcmpQueue.xcmpMessageSent.v205.is(event)) {
          result = events.xcmpQueue.xcmpMessageSent.v205.decode(event);
        } else {
          throw new Error('Unsupported spec');
        }

        if (dataMB.some((item: DataMB) => item.hash === result.messageHash)) {
          for (let associatedEvent of block.events) {
            let sender: string = '';
            let amount: bigint = 0n;
            let asset: string = '';
            let dest: number = 0;
            let assetName: string = '';
            let assetIDHDX: number = 0;

            if (associatedEvent.name == events.xTokens.transferredAssets.name) {
              let innerResult;
              if (events.xTokens.transferredAssets.v244.is(associatedEvent)) {
                innerResult =
                  events.xTokens.transferredAssets.v244.decode(associatedEvent);

                // Get Sender
                sender = ss58.codec('hydradx').encode(innerResult.sender);
                // Get Parachain Destination
                if (innerResult.dest.interior.__kind == 'X2') {
                  for (const junction of innerResult.dest.interior.value) {
                    if (junction.__kind == 'Parachain') {
                      dest = junction.value;
                    }
                  }
                }
                // Get Asset Info
                for (let assetType of innerResult.assets) {
                  if (assetType.id.interior.__kind == 'X3') {
                    amount = assetType.fun.value as bigint;
                    for (let assetProperties of assetType.id.interior.value) {
                      if (assetProperties.__kind == 'AccountKey20') {
                        asset = assetProperties.key;
                        assetName = assetMapping[asset].name;
                        assetIDHDX = assetMapping[asset].id;
                      }
                    }
                  }
                }
              } else {
                throw new Error('Unsupported spec');
              }

              xcmEvent.push({
                id: associatedEvent.id,
                hash: result.messageHash,
                sender: sender,
                dest: dest,
                asset: asset,
                amount: amount,
                assetIDHDX: assetIDHDX,
                assetName: assetName,
              });
            }
          }
        }
      }
    }
  }
  return xcmEvent;
}

function createXCMs(xcmEvents: xcmEvent[]): XCM[] {
  let XCMs: XCM[] = [];
  for (let x of xcmEvents) {
    let { id, hash, sender, dest, asset, amount, assetIDHDX, assetName } = x;

    XCMs.push(
      new XCM({
        id,
        hash,
        sender,
        dest,
        asset,
        amount,
        assetIDHDX,
        assetName,
      })
    );
  }
  return XCMs;
}
