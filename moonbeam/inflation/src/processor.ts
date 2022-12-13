import { lookupArchive } from "@subsquid/archive-registry";
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
  toHex,
} from "@subsquid/substrate-processor";
import { EventItem } from "@subsquid/substrate-processor/lib/interfaces/dataSelection";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { ParachainBondTransfer, StakingReward, BurnedFees } from "./model";
import {
  ParachainStakingRewardedEvent,
  ParachainStakingReservedForParachainBondEvent,
  TreasuryDepositEvent,
} from "./types/events";

const processor = new SubstrateBatchProcessor()
  .setBatchSize(500) // ❗️ you may need to change this parameter if you get 500 errors related to timeouts
  .setBlockRange({ from: 1772317 }) // 👈 you can define a block range by uncommenting this and inserting the block numbers
  .setDataSource({
    archive: lookupArchive("moonbeam", { release: "FireSquid" }),
    chain: "wss://moonbeam.api.onfinality.io/public-ws",
  })
  .addEvent("Treasury.Deposit")
  .addEvent("ParachainStaking.Rewarded")
  .addEvent("ParachainStaking.ReservedForParachainBond");

type Item = BatchProcessorItem<typeof processor>;
type Ctx = BatchContext<Store, Item>;

processor.run(new TypeormDatabase(), processEvents);

async function processEvents(ctx: Ctx) {
  const rewards: StakingReward[] = [];
  const parachainBondTransfers: ParachainBondTransfer[] = [];
  const burnedFees: BurnedFees[] = [];

  for (const block of ctx.blocks) {
    for (const item of block.items) {
      if (item.name === "ParachainStaking.Rewarded") {
        const reward = processRewards(item, ctx, block.header.timestamp);
        rewards.push(reward);
      } else if (item.name === "ParachainStaking.ReservedForParachainBond") {
        const parachainBondTransfer = processParachainBondTransfers(
          item,
          ctx,
          block.header.timestamp
        );
        parachainBondTransfers.push(parachainBondTransfer);
      } else if (item.name === "Treasury.Deposit") {
        const burnedFee = processTreasuryDeposits(
          item,
          ctx,
          block.header.timestamp
        );
        burnedFees.push(burnedFee);
      }
    }
  }

  await ctx.store.insert(rewards);
  await ctx.store.insert(parachainBondTransfers);
  await ctx.store.insert(burnedFees);
}

function processRewards(
  item: EventItem<"ParachainStaking.Rewarded", true>,
  ctx: Ctx,
  timestamp: number
) {
  const event = new ParachainStakingRewardedEvent(ctx, item.event);
  let balance = 0n;
  let account: string = "";

  if (event.isV900) {
    account = toHex(event.asV900[0]);
    balance = event.asV900[1];
  } else if (event.isV1300) {
    account = toHex(event.asV1300.account);
    balance = event.asV1300.rewards;
  }

  const reward = new StakingReward();

  reward.id = getId(item.event.id);
  reward.account = account;
  reward.balance = balance;
  reward.timestamp = BigInt(timestamp);

  return reward;
}

function processParachainBondTransfers(
  item: EventItem<"ParachainStaking.ReservedForParachainBond", true>,
  ctx: Ctx,
  timestamp: number
) {
  const event = new ParachainStakingReservedForParachainBondEvent(
    ctx,
    item.event
  );
  let balance = 0n;

  if (event.isV900) {
    balance = event.asV900[1];
  } else if (event.isV1300) {
    balance = event.asV1300.value;
  }

  const parachainBondTransfer = new ParachainBondTransfer();

  parachainBondTransfer.id = getId(item.event.id);
  parachainBondTransfer.balance = balance;
  parachainBondTransfer.timestamp = BigInt(timestamp);

  return parachainBondTransfer;
}

function getId(eventId: string) {
  const [blockNo, eventIdx] = eventId.split("-");

  let index = parseInt(eventIdx, 10).toString();
  if (index.length == 1) {
    index = `00${index}`;
  } else if (index.length == 2) {
    index = `0${index}`;
  }

  return `${parseInt(blockNo, 10)}-${index}`;
}

function processTreasuryDeposits(
  item: EventItem<"Treasury.Deposit", true>,
  ctx: Ctx,
  timestamp: number
) {
  const event = new TreasuryDepositEvent(ctx, item.event);
  let balance = 0n;

  if (event.isV900) {
    balance = event.asV900;
  } else if (event.isV1300) {
    balance = event.asV1300.value;
  }

  const amount = balance * 4n;
  const burnedFee = new BurnedFees();

  burnedFee.id = getId(item.event.id);
  burnedFee.amount = amount;
  burnedFee.timestamp = BigInt(timestamp);

  return burnedFee;
}
