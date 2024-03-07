import { TypeormDatabase } from '@subsquid/typeorm-store';
import { In } from 'typeorm';
import { processor, Call, Event } from './processor';
import { Address, Transaction } from './model';

const weightPerGas = 25000;
const chainId = process.env.chainId || '';

processor.run(new TypeormDatabase(), async (ctx) => {
  const transactions: Transaction[] = [];
  const addresses: Address[] = [];

  for (const block of ctx.blocks) {
    // For handling batch transactions
    let batchCounter = 0;
    let currentBatchId = '';

    // There are four system extrinsics: 'ParachainSystem.set_validation_data', 'Timestamp.set'
    // 'AuthorNoting.set_latest_author_data', and 'AuthorInherent.kick_off_authorship_validation'.
    // System extrinsics will be at index 0-3, so we can skip ahead to the
    // extrinsic starting at index 4
    for (let i = 4; i < block.calls.length; i++) {
      if (block.calls[i].name === 'Ethereum.transact') {
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

        // Handle batch transactions
        // If it's a batch transaction, the args object will contain a calls object
        if (block.calls[i].args && block.calls[i].args.calls) {
          if (currentBatchId == block.calls[i].id) {
            // Second, third, etc. call of the batch call, so all we need to do is
            // increment the batch counter
            batchCounter++;
          } else {
            // First call of the batch call
            currentBatchId = block.calls[i].id;
            batchCounter = 1;
          }
        }

        const { substrateTx, addressesFromSubstrateTx } =
          processSubstrateTransactions(
            block.header.height,
            block.events,
            block.calls[i],
            batchCounter
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
  events: Event[],
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

  if (call.args.transaction.value.action.__kind == 'Call') {
    // In this case, it can be either a contract interaction or a balance transfer
    // If the input is '0x' and the value is greater than 0, it's a balance transfer
    if (
      call.args.transaction.value.input == '0x' &&
      call.args.transaction.value.value > 0
    ) {
      transaction.type = 'Balance Transfer';
    } else {
      transaction.type = 'Contract Call';
    }
  } else {
    // Otherwise it's a 'Create'
    transaction.type = 'Contract Create';
  }

  for (const event of events) {
    if (event.extrinsicIndex == extrinsicIndex) {
      // Extract sender and receiver data from 'Ethereum.Executed' events
      if (event.name === 'Ethereum.Executed') {
        transaction.sender = event.args.from;
        transaction.receiver = event.args.to;
        transaction.hash = event.args.transactionHash;

        // Extract sender to save to addresses
        const sender = {
          id: event.args.from,
          isContract: false,
          chainId,
        };
        addressesFromEvmTx.push(sender);

        // Extract receiver to save to addresses
        const receiver = {
          id: event.args.to,
          isContract: transaction.type === 'Balance Transfer' ? false : true,
          chainId,
        };
        addressesFromEvmTx.push(receiver);

        if (event.args.exitReason.__kind !== 'Succeed') {
          transaction.isSuccess = false;
        }
      }
      // Extract weight info from 'System.ExtrinsicSuccess' events. Note: If an EVM
      // transaction fails, it's reported in the 'Ethereum.Executed' event
      if (event.name === 'System.ExtrinsicSuccess') {
        transaction.gasUsed = BigInt(
          event.args.dispatchInfo.weight.refTime / weightPerGas
        );
      }
    }
  }

  return { evmTx: new Transaction(transaction), addressesFromEvmTx };
};

const processSubstrateTransactions = (
  blockNo: number,
  events: Event[],
  call: Call,
  batchId: number
): { substrateTx: Transaction; addressesFromSubstrateTx: Address[] } => {
  const addressesFromSubstrateTx: Address[] = [];
  const extrinsicIndex = call.extrinsicIndex;

  // Process Substrate transactions
  const transaction: Transaction = {
    id: batchId == 0 ? call.id : `${call.id}-${batchId}`,
    chainId,
    blockNo,
    evm: false,
    isSuccess: true,
    hash: call.extrinsic?.hash,
    sender: undefined,
    receiver: undefined,
    gasUsed: undefined, // EVM only
    type: undefined, // EVM only
  };

  for (const event of events) {
    if (event.extrinsicIndex == extrinsicIndex) {
      // Check if the extrinsic failed using the 'System.ExtrinsicFailed' event
      if (event.name === 'System.ExtrinsicFailed') {
        transaction.isSuccess = false;
      }
      if (event.name === 'Balances.Withdraw') {
        transaction.sender = event.args.who;

        // Extract sender to save to addresses
        const sender = {
          id: event.args.who,
          isContract: false,
          chainId,
        };
        addressesFromSubstrateTx.push(sender);
      }
      if (event.name === 'Balances.Deposit') {
        transaction.receiver = event.args.who;

        // Extract receiver to save to addresses
        const receiver = {
          id: event.args.who,
          isContract: false,
          chainId,
        };
        addressesFromSubstrateTx.push(receiver);
      }
    }
  }
  return {
    substrateTx: new Transaction(transaction),
    addressesFromSubstrateTx,
  };
};
