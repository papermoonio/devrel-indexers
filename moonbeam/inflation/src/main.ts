import { TypeormDatabase } from '@subsquid/typeorm-store';
import { processor, Event } from './processor';
import { ParachainBondTransfer, StakingReward, BurnedFees } from './model';
import { events } from './types';

// Constants for Moonbeam
const TREASURY_ACCOUNT = '0x6d6f646c70792f74727372790000000000000000'.toLowerCase();
// Current parachain bond account for Moonbeam
const PARACHAIN_BOND_ACCOUNT = '0x8EBb465D98E7589855485Cd190c7BEd6A36C4C34'.toLowerCase();
const THRESHOLD_AMOUNT = 5000000000000000000000n; // 5000 GLMR
// Block where fee logic changed (new fee burn mechanism)
const BLOCK_WHERE_FEE_LOGIC_CHANGED = 10002956;
// Block where Treasury.Deposit event changed to Balances.Deposit
const BLOCK_TREASURY_TO_BALANCES = 5899847;
// Block where Orbiter rewards start
const BLOCK_ORBITER_REWARDS_START = 2673234;

// -------------------------------------------
//  MAIN INDEXER LOGIC
// -------------------------------------------
processor.run(new TypeormDatabase(), async (ctx) => {
  const rewards: StakingReward[] = [];
  const parachainBondTransfers: ParachainBondTransfer[] = [];
  const burnedFees: BurnedFees[] = [];

  for (const block of ctx.blocks) {
    // Prepare arrays to gather withdraw & deposit events for post-BLOCK_WHERE_FEE_LOGIC_CHANGED logic
    const withdrawsInBlock: { eventId: string; who: string; amount: bigint }[] = [];
    const depositsInBlock: { eventId: string; who: string; amount: bigint }[] = [];

    for (const event of block.events) {
      // ---------------------------------
      // 1) STAKING REWARDS
      // ---------------------------------
      if (event.name === events.parachainStaking.rewarded.name) {
        rewards.push(processRewards(event, block.header.timestamp));
      } else if (event.name === 'MoonbeamOrbiters.OrbiterRewarded') {
        // Only count Orbiter rewards starting at the specified block
        if (block.header.height >= BLOCK_ORBITER_REWARDS_START) {
          const reward = processOrbiterRewards(event, block.header.timestamp);
          if (reward) rewards.push(reward);
        }
      }

      // ---------------------------------
      // 2) PARACHAIN BOND TRANSFERS
      // ---------------------------------
      else if (event.name === 'ParachainStaking.ReservedForParachainBond') {
        const bondXfer = processParachainBondTransfers(
          event, 
          block.header.timestamp, 
          TREASURY_ACCOUNT, 
          PARACHAIN_BOND_ACCOUNT
        );
        parachainBondTransfers.push(bondXfer);
      } else if (event.name === 'ParachainStaking.InflationDistributed') {
        const bondXfer = processParachainBondTransfers(
          event, 
          block.header.timestamp, 
          TREASURY_ACCOUNT, 
          PARACHAIN_BOND_ACCOUNT
        );
        parachainBondTransfers.push(bondXfer);
      }

      // ---------------------------------
      // 3) PRE-BLOCK-10002956 FEE BURNS (LEGACY FEE HANDLING)
      // ---------------------------------
      else if (block.header.height < BLOCK_TREASURY_TO_BALANCES && event.name === 'Treasury.Deposit') {
        // Handle Treasury.Deposit events before the switch to Balances.Deposit
        const burnedFee = processTreasuryDeposits(event, block.header.timestamp);
        if (burnedFee !== null) burnedFees.push(burnedFee);
      } else if (
        block.header.height >= BLOCK_TREASURY_TO_BALANCES &&
        block.header.height < BLOCK_WHERE_FEE_LOGIC_CHANGED &&
        event.name === events.balances.deposit.name
      ) {
        let who = '';
        let balance = 0n;

        if (events.balances.deposit.v900.is(event)) {
          const [whoFromEvent, balanceFromEvent] = events.balances.deposit.v900.decode(event);
          who = whoFromEvent;
          balance = balanceFromEvent;
        } else if (events.balances.deposit.v1201.is(event)) {
          const decoded = events.balances.deposit.v1201.decode(event);
          who = decoded.who;
          balance = decoded.amount;
        }

        if (who.toLowerCase() === TREASURY_ACCOUNT && balance < THRESHOLD_AMOUNT) {
          const burnedFee = processTreasuryDeposits(event, block.header.timestamp);
          if (burnedFee !== null) burnedFees.push(burnedFee);
        }
      }

      // ---------------------------------
      // 4) POST-BLOCK-10002956 FEE BURNS (NEW FEE HANDLING)
      // ---------------------------------
      else if (block.header.height >= BLOCK_WHERE_FEE_LOGIC_CHANGED) {
        // (a) Balances.Withdraw
        if (event.name === events.balances.withdraw.name) {
          if (events.balances.withdraw.v1001.is(event)) {
            const [whoFromEvent, amountFromEvent] =
              events.balances.withdraw.v1001.decode(event);
            
            // Skip large treasury withdrawals
            if (!(whoFromEvent.toLowerCase() === TREASURY_ACCOUNT && 
                amountFromEvent >= THRESHOLD_AMOUNT)) {
              withdrawsInBlock.push({
                eventId: event.id,
                who: whoFromEvent,
                amount: amountFromEvent,
              });
            }
          } else if (events.balances.withdraw.v1201.is(event)) {
            const decoded = events.balances.withdraw.v1201.decode(event);
            
            // Skip large treasury withdrawals
            if (!(decoded.who.toLowerCase() === TREASURY_ACCOUNT && 
                decoded.amount >= THRESHOLD_AMOUNT)) {
              withdrawsInBlock.push({
                eventId: event.id,
                who: decoded.who,
                amount: decoded.amount,
              });
            }
          }
        }
        // (b) Balances.Deposit (possible partial refund)
        else if (event.name === events.balances.deposit.name) {
          let who = '';
          let amount = 0n;
          if (events.balances.deposit.v900.is(event)) {
            const [whoFromEvent, balFromEvent] =
              events.balances.deposit.v900.decode(event);
            who = whoFromEvent;
            amount = balFromEvent;
          } else if (events.balances.deposit.v1201.is(event)) {
            const decoded = events.balances.deposit.v1201.decode(event);
            who = decoded.who;
            amount = decoded.amount;
          }

          depositsInBlock.push({
            eventId: event.id,
            who,
            amount,
          });
        }
      }
    } // end for (const event)

    // -------------------------------------
    // 5) COMPUTE FEE BURN AT BLOCK-LEVEL
    // -------------------------------------
    if (block.header.height >= BLOCK_WHERE_FEE_LOGIC_CHANGED) {
      // Group withdrawals by account
      const withdrawalsByAccount = new Map<string, bigint>();
      for (const wd of withdrawsInBlock) {
        const lowerWho = wd.who.toLowerCase();
        withdrawalsByAccount.set(
          lowerWho, 
          (withdrawalsByAccount.get(lowerWho) || 0n) + wd.amount
        );
      }
      
      // Group deposits by account
      const depositsByAccount = new Map<string, bigint>();
      for (const dep of depositsInBlock) {
        const lowerWho = dep.who.toLowerCase();
        depositsByAccount.set(
          lowerWho, 
          (depositsByAccount.get(lowerWho) || 0n) + dep.amount
        );
      }
      
      // Calculate burns by comparing total withdrawals to total deposits per account
      for (const [account, totalWithdrawal] of withdrawalsByAccount.entries()) {
        const totalDeposit = depositsByAccount.get(account) || 0n;
        const burnAmount = totalWithdrawal - totalDeposit;
        
        if (burnAmount > 0n) {
          // Create a unique ID based on block and account
          const burnId = `${block.header.height}-${account.substring(0, 10)}`;
          
          burnedFees.push(
            new BurnedFees({
              id: burnId,
              amount: burnAmount,
              timestamp: block.header.timestamp ? BigInt(block.header.timestamp) : undefined,
            })
          );
        }
      }
    }
  } // end for blocks

  // ---------------------------------------
  // 6) WRITE TO DATABASE
  // ---------------------------------------
  await ctx.store.insert(rewards);
  await ctx.store.insert(parachainBondTransfers);
  await ctx.store.insert(burnedFees);
});

// -------------------------------------------------------
// HELPER FUNCTIONS
// -------------------------------------------------------
function processRewards(event: Event, timestamp: number | undefined) {
  let balance = 0n;
  let account = '';

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
  return null;
}

function processParachainBondTransfers(
  event: Event, 
  timestamp: number | undefined, 
  treasuryAccount: string, 
  parachainBondAccount: string
) {
  let balance = 0n;
  let destinationAddress = '';
  let destination = 'unknown';

  // For ReservedForParachainBond events
  if (events.parachainStaking.reservedForParachainBond.v900.is(event)) {
    const decodedEvent = events.parachainStaking.reservedForParachainBond.v900.decode(event);
    balance = decodedEvent[1];
    
    // Check if account is provided in the event
    if (decodedEvent[0]) {
      destinationAddress = decodedEvent[0].toLowerCase();
    } else {
      // Default to parachain bond account if no destination is specified
      destinationAddress = parachainBondAccount;
    }
  } else if (events.parachainStaking.reservedForParachainBond.v1300.is(event)) {
    const decodedEvent = events.parachainStaking.reservedForParachainBond.v1300.decode(event);
    balance = decodedEvent.value;
    
    // Similar check for v1300
    if (decodedEvent.account) {
      destinationAddress = decodedEvent.account.toLowerCase();
    } else {
      destinationAddress = parachainBondAccount;
    }
  } 
  // For InflationDistributed events
  else if (events.parachainStaking.inflationDistributed.v3300.is(event)) {
    const decodedEvent = events.parachainStaking.inflationDistributed.v3300.decode(event);
    balance = decodedEvent.value;
    
    // Use the account from the event
    if (decodedEvent.account) {
      destinationAddress = decodedEvent.account.toLowerCase();
      
      // Determine if it's treasury or parachain bond based on the account address
      if (destinationAddress === treasuryAccount) {
        destination = 'treasury';
      } else if (destinationAddress === parachainBondAccount) {
        destination = 'parachainBond';
      }
    } else {
      // Default to parachain bond account if no account is specified
      destinationAddress = parachainBondAccount;
    }
  }

  // Determine destination type based on address
  if (destinationAddress === treasuryAccount) {
    destination = 'treasury';
  } else if (destinationAddress === parachainBondAccount) {
    destination = 'parachainBond';
  }

  return new ParachainBondTransfer({
    id: event.id,
    balance,
    timestamp: timestamp ? BigInt(timestamp) : undefined,
    destination,
    destinationAddress
  });
}

function processTreasuryDeposits(event: Event, timestamp: number | undefined) {
  let balance = 0n;
  let who = '';

  // Check if it's a Treasury.Deposit event
  if (events.treasury.deposit.v900.is(event)) {
    balance = events.treasury.deposit.v900.decode(event);
  } else if (events.treasury.deposit.v1300.is(event)) {
    const { value } = events.treasury.deposit.v1300.decode(event);
    balance = value;
  }

  // Updated handling for Balances.Deposit event
  if (events.balances.deposit.v900.is(event)) {
    const [whoFromEvent, balanceFromEvent] = events.balances.deposit.v900.decode(event);
    who = whoFromEvent;
    balance = balanceFromEvent;
  } else if (events.balances.deposit.v1201.is(event)) {
    const decoded = events.balances.deposit.v1201.decode(event);
    who = decoded.who;
    balance = decoded.amount;
  }

  // Apply multiplier for burned fees
  const amount = balance * 4n;

  return new BurnedFees({
    id: event.id,
    amount,
    timestamp: timestamp ? BigInt(timestamp) : undefined,
  });
}