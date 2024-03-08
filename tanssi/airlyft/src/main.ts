import { TypeormDatabase } from '@subsquid/typeorm-store';
import { In } from 'typeorm';
import { processor, Call, Event } from './processor';
import { Address, Transaction } from './model';
import { calls, events } from './types';

const weightPerGas = 25000n;
const chainId = process.env.CHAIN_ID || '';

processor.run(new TypeormDatabase(), async (ctx) => {
  const transactions: Transaction[] = [];
  const addresses: Address[] = [];

  for (const block of ctx.blocks) {
    // There are four system extrinsics: 'ParachainSystem.set_validation_data', 'Timestamp.set'
    // 'AuthorNoting.set_latest_author_data', and 'AuthorInherent.kick_off_authorship_validation'.
    // System extrinsics will be at index 0-3, so we can skip ahead to the
    // extrinsic starting at index 4
    for (let i = 4; i < block.calls.length; i++) {
      if (block.calls[i].name === calls.ethereum.transact.name) {
        // Process EVM transactions
        const { evmTx, addressesFromEvmTx } = processEvmTransactions(
          block.header.height,
          block.events,
          block.calls[i]
        );
        transactions.push(evmTx);
        addresses.push(...addressesFromEvmTx);
      } else {
        // Process Substrate transactions
        const { substrateTx, addressesFromSubstrateTx } =
          processSubstrateTransactions(
            block.header.height,
            block.events,
            block.calls[i]
          );
        transactions.push(substrateTx);
        addresses.concat(addressesFromSubstrateTx);
      }
    }
  }

  // Grab unique addresses
  let uniqueAddresses = await ctx.store
    .findBy(Address, { id: In([...addresses]) })
    .then((accounts) => new Map(accounts.map((a) => [a.id, a])));
  for (let address of addresses) {
    if (!uniqueAddresses.has(address.id)) {
      uniqueAddresses.set(address.id, new Address(address));
    }
  }

  // Save data to db
  await ctx.store.upsert([...uniqueAddresses.values()]);
  await ctx.store.insert(transactions);
});

const processEvmTransactions = (
  blockNo: number,
  blockEvents: Event[],
  call: Call
): { evmTx: Transaction; addressesFromEvmTx: Address[] } => {
  const extrinsicIndex = call.extrinsicIndex;
  const addressesFromEvmTx: Address[] = [];

  // Process EVM transactions
  const transaction: Transaction = {
    id: call.id,
    chainId,
    blockNo,
    evm: true,
    isSuccess: true,
    hash: undefined,
    sender: undefined,
    receiver: undefined,
    gasUsed: undefined,
    type: undefined,
  };

  const {
    transaction: {
      value: { input, value, action },
    },
  } = calls.ethereum.transact.v100.decode(call);

  if (action.__kind == 'Call') {
    // In this case, it can be either a contract interaction or a balance transfer
    // If the input is '0x' and the value is greater than 0, it's a balance transfer
    if (input == '0x' && value > 0) {
      transaction.type = 'Balance Transfer';
    } else {
      transaction.type = 'Contract Call';
    }
  } else {
    // Otherwise it's a 'Create'
    transaction.type = 'Contract Create';
  }

  for (const event of blockEvents) {
    if (event.extrinsicIndex == extrinsicIndex) {
      // Extract sender and receiver data from 'Ethereum.Executed' events
      if (event.name === events.ethereum.executed.name) {
        const { from, to, transactionHash, exitReason } =
          events.ethereum.executed.v100.decode(event);

        transaction.sender = from;
        transaction.receiver = to;
        transaction.hash = transactionHash;
        transaction.isSuccess = exitReason.__kind === 'Succeed' ? true : false;

        // Save sender and receiver addresses
        const sender = {
          id: from,
          isContract: false,
          chainId,
        };
        const receiver = {
          id: to,
          isContract: transaction.type === 'Balance Transfer' ? false : true,
          chainId,
        };
        addressesFromEvmTx.push(sender);
        addressesFromEvmTx.push(receiver);
      }

      // Extract weight info from 'System.ExtrinsicSuccess' events. Note: If an EVM
      // transaction fails, it's reported in the 'Ethereum.Executed' event
      if (event.name === events.system.extrinsicSuccess.name) {
        const {
          dispatchInfo: {
            weight: { refTime },
          },
        } = events.system.extrinsicSuccess.v100.decode(event);
        transaction.gasUsed = refTime / weightPerGas;
      }
    }
  }

  return { evmTx: new Transaction(transaction), addressesFromEvmTx };
};

const processSubstrateTransactions = (
  blockNo: number,
  blockEvents: Event[],
  call: Call
): { substrateTx: Transaction; addressesFromSubstrateTx: Address[] } => {
  const addressesFromSubstrateTx: Address[] = [];
  const extrinsicIndex = call.extrinsicIndex;

  // Process Substrate transactions
  const transaction: Transaction = {
    id: call.id,
    chainId,
    blockNo,
    evm: false,
    isSuccess: true,
    hash: call.extrinsic?.hash,
    sender: call.origin.value.value,
    receiver: undefined,
    gasUsed: undefined, // EVM only
    type: undefined, // EVM only
  };

  // Get the status of the extrinsic
  if (call.extrinsic) {
    transaction.isSuccess = call.extrinsic.success;
  } else {
    for (const event of blockEvents) {
      if (event.extrinsicIndex == extrinsicIndex) {
        if (event.name === events.system.extrinsicFailed.name) {
          transaction.isSuccess = false;
        }
      }
    }
  }

  // Get the receiver for balance transfers
  if (call.name === calls.balances.transferAll.name) {
    const { dest } = calls.balances.transferAll.v100.decode(call);
    transaction.receiver = dest;
    const receiver = {
      id: dest,
      isContract: false,
      chainId,
    };
    addressesFromSubstrateTx.push(receiver);
  }
  if (call.name === calls.balances.transferAllowDeath.name) {
    const { dest } = calls.balances.transferAllowDeath.v100.decode(call);
    transaction.receiver = dest;
    const receiver = {
      id: dest,
      isContract: false,
      chainId,
    };
    addressesFromSubstrateTx.push(receiver);
  }
  if (call.name === calls.balances.transferKeepAlive.name) {
    const { dest } = calls.balances.transferKeepAlive.v100.decode(call);
    transaction.receiver = dest;
    const receiver = {
      id: dest,
      isContract: false,
      chainId,
    };
    addressesFromSubstrateTx.push(receiver);
  }

  // Save the sender's address
  const sender = {
    id: call.origin.value.value,
    isContract: false,
    chainId,
  };
  addressesFromSubstrateTx.push(sender);

  return {
    substrateTx: new Transaction(transaction),
    addressesFromSubstrateTx,
  };
};
