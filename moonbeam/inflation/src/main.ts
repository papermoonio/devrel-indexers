import { TypeormDatabase } from '@subsquid/typeorm-store';
import { processor, Event } from './processor';
import { ParachainBondTransfer, StakingReward, BurnedFees } from './model';
import { events } from './types';

processor.run(new TypeormDatabase(), async (ctx) => {
  const rewards: StakingReward[] = [];
  const parachainBondTransfers: ParachainBondTransfer[] = [];
  const burnedFees: BurnedFees[] = [];

  for (const block of ctx.blocks) {
    for (const event of block.events) {
      if (event.name === events.parachainStaking.rewarded.name) {
        const reward = processRewards(event, block.header.timestamp);
        rewards.push(reward);
      } else if (event.name === 'MoonbeamOrbiters.OrbiterRewarded') {
        // Only count Orbiter rewards starting at RT 2000
        if (block.header.height >= 2673234) {
          const reward = processOrbiterRewards(event, block.header.timestamp);
          if (reward) {
            rewards.push(reward);
          }
        }
      } else if (event.name === 'ParachainStaking.ReservedForParachainBond') {
        const parachainBondTransfer = processParachainBondTransfers(
          event,
          block.header.timestamp
        );
        parachainBondTransfers.push(parachainBondTransfer);
      } else if (event.name === 'Treasury.Deposit') {
        const burnedFee = processTreasuryDeposits(
          event,
          block.header.timestamp
        );
        burnedFees.push(burnedFee);
      }
    }
  }
  await ctx.store.insert(rewards);
  await ctx.store.insert(parachainBondTransfers);
  await ctx.store.insert(burnedFees);
});

function processRewards(event: Event, timestamp: number | undefined) {
  let balance = 0n;
  let account: string = '';

  if (events.parachainStaking.rewarded.v900.is(event)) {
    const decodedEvent = events.parachainStaking.rewarded.v900.decode(event);
    account = decodedEvent[0];
    balance = decodedEvent[1];
  } else if (events.parachainStaking.rewarded.v1300.is(event)) {
    const decodedEvent = events.parachainStaking.rewarded.v1300.decode(event);
    account = decodedEvent.account;
    balance = decodedEvent.rewards;
  }

  return new StakingReward({
    id: event.id,
    account,
    balance,
    timestamp: timestamp ? BigInt(timestamp) : undefined,
  });
}

function processOrbiterRewards(event: Event, timestamp: number | undefined) {
  if (events.moonbeamOrbiters.orbiterRewarded.v1502.is(event)) {
    const { account, rewards } =
      events.moonbeamOrbiters.orbiterRewarded.v1502.decode(event);

    return new StakingReward({
      id: event.id,
      account,
      balance: rewards,
      timestamp: timestamp ? BigInt(timestamp) : undefined,
    });
  }
}

function processParachainBondTransfers(
  event: Event,
  timestamp: number | undefined
) {
  let balance = 0n;

  if (events.parachainStaking.reservedForParachainBond.v900.is(event)) {
    const decodedEvent =
      events.parachainStaking.reservedForParachainBond.v900.decode(event);
    balance = decodedEvent[1];
  } else if (events.parachainStaking.reservedForParachainBond.v1300.is(event)) {
    const decodedEvent =
      events.parachainStaking.reservedForParachainBond.v1300.decode(event);
    balance = decodedEvent.value;
  }

  return new ParachainBondTransfer({
    id: event.id,
    balance,
    timestamp: timestamp ? BigInt(timestamp) : undefined,
  });
}

function processTreasuryDeposits(event: Event, timestamp: number | undefined) {
  let balance = 0n;

  if (events.treasury.deposit.v900.is(event)) {
    balance = events.treasury.deposit.v900.decode(event);
  } else if (events.treasury.deposit.v1300.is(event)) {
    const { value } = events.treasury.deposit.v1300.decode(event);
    balance = value;
  }

  const amount = balance * 4n;
  return new BurnedFees({
    id: event.id,
    amount: balance,
    timestamp: timestamp ? BigInt(timestamp) : undefined,
  });
}
