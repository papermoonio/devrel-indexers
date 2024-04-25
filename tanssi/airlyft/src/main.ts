import { Store, TypeormDatabase } from '@subsquid/typeorm-store';
import { In } from 'typeorm';
import { processor, Call, Event, ProcessorContext } from './processor';
import { Address, Chain, Transaction, TransactionType } from './model';
import { calls as evmCalls, events as evmEvents } from './evm-types';
import { calls, events } from './substrate-types';
import * as ss58 from '@subsquid/ss58';

/** --------------------------------------- DOCUMENTATION -----------------------------------------

This processor is set up to handle multiple chains: https://docs.subsquid.io/sdk/resources/basics/multichain/
To test it out with multiple chains locally, you will need to take the following steps:
  
  1. Create a directory for each chain in the `src` directory
  2. In each directory, add a copy of the `main.ts` and processor.ts` files
  3. In `main.ts` for each chain dir:
      a. Update the CHAIN_ID
      b. Update > processor.run(new TypeormDatabase(), async (ctx) => {} 
         to be  > processor.run(new TypeormDatabase({stateSchema: `${CHAIN_ID}-processor`}), async (ctx) => {}    
  4. In `processor.ts` of each chain dir
      a. Update the RPC_ENDPOINT
  5. In `commands.json` add a command for starting up each processor. There must be one command per chain:
        "process:INSERT_CHAIN_ID": {
          "deps": ["build", "migration:apply"],
          "cmd": ["node", "lib/INSERT_CHAIN_DIR_NAME/main.js"]
        }
  6. Update the `squid.yaml` file to spin up each processor
        processor:
          - name: INSERT_CHAIN_ID-processor
            cmd: ['sqd', 'process:INSERT_CHAIN_ID']
          - name: INSERT_CHAIN_ID-processor
            cmd: ['sqd', 'process:INSERT_CHAIN_ID']
  7. To run them all at once, use ths `sqd run` command

Note:
- Internal transactions on the EVM are not accounted for. However, any new addresses created from
  internal transactions are accounted for. Because of this, there may be accounts that exist with
  0 transactions sent and 0 transactions received
- Subcalls of batch transactions are not counted. Only the root batch transaction itself. Because
  of this, there may be accounts that exist with 0 transactions sent and 0 transactions received
- Failed transactions are not counted

----------------------------------------------------------------------------------------------- **/

const weightPerGas = BigInt(25000);
const chainId = process.env.CHAIN_ID || '';

type Tuple<T, K, L> = [T, K, L];
interface TransactionInfo {
  transactions: Tuple<Transaction, string, string>[]; // The transaction, the sender, the receiver
  addresses: Set<string>;
}

interface TransactionAddresses {
  sender: string;
  receiver: string;
}

const chainStats = {
  totalTransactions: 0n,
  totalContractCalls: 0n,
  totalContractsCreated: 0n,
  totalGasUsed: 0n,
  uniqueAddressesCount: 0n,
};
let chainSaved = false;

processor.run(new TypeormDatabase(), async (ctx) => {
  // Get the chain properties, which will tell us if it is an EVM or Substrate chain
  const chainProperties = await ctx._chain.rpc.call('system_properties');

  const transactionInfo = getTransactionInfo(ctx, chainProperties.isEthereum);

  // Get the chain item from the database
  const chain = new Chain({
    id: chainId,
  });

  // Get the addresses from the database
  let addresses = await ctx.store
    .findBy(Address, {
      id: In([...transactionInfo.addresses]),
    })
    .then((addresses) => new Map(addresses.map((c) => [c.id, c])));

  for (let address of transactionInfo.addresses) {
    if (!addresses.has(address)) {
      // If the list of unique addresses doesnt include this address, create a new address
      // and set all the stats to 0
      const newAddress = new Address({
        id: address,
        address: address.split('-')[1], // The address is in chain-address format, so just grab the address here
        chain,
        isContract: false,
        totalTransactions: BigInt(0),
        totalContractCalls: BigInt(0),
        totalContractsCreated: BigInt(0),
        totalGasUsed: BigInt(0),
      });
      addresses.set(address, newAddress);

      // Add new addresses to the total count for the chain
      chainStats.uniqueAddressesCount += BigInt(1);
    }
  }

  // Update the Address, the Chain, and the AddressChainConnection for each tx
  for (const transaction of transactionInfo.transactions) {
    const [transactionObject, sender, receiver] = transaction;

    /* Process the sender stats */
    const senderAddress = addresses.get(sender) as Address;

    // Update the stats
    const transactions = BigInt(1);
    const contractCalls =
      transactionObject.type === TransactionType.CONTRACT_CALL
        ? BigInt(1)
        : BigInt(0);
    const contractsCreated =
      transactionObject.type === TransactionType.CONTRACT_CREATION
        ? BigInt(1)
        : BigInt(0);
    const totalGasUsed = transactionObject.gasUsed;

    senderAddress.totalTransactions += transactions;
    senderAddress.totalContractCalls += contractCalls;
    senderAddress.totalContractsCreated += contractsCreated;
    senderAddress.totalGasUsed += totalGasUsed;

    // Update the transaction to include the sender now that we have the Address created
    transactionObject.sender = senderAddress;

    /* Process the receiver stats */
    if (receiver) {
      const receiverAddress = addresses.get(receiver) as Address;

      // Update the address to be a contract address if the type is CONTRACT_CALL
      receiverAddress.isContract =
        transactionObject.type === TransactionType.CONTRACT_CREATION;

      // Update the transaction to include the receiver now that we have the Address created
      transactionObject.receiver = receiverAddress;
    }

    /* Process the chain stats */
    chainStats.totalTransactions += transactions;
    chainStats.totalContractCalls += contractCalls;
    chainStats.totalContractsCreated += contractsCreated;
    chainStats.totalGasUsed += totalGasUsed;

    // Update the transaction to include the chain now that we have the Chain
    transactionObject.chain = chain;
  }

  // Update the chain data with the new stats
  chain.totalTransactions = chainStats.totalTransactions;
  chain.totalContractCalls = chainStats.totalContractCalls;
  chain.totalContractsCreated = chainStats.totalContractsCreated;
  chain.totalGasUsed = chainStats.totalGasUsed;
  chain.uniqueAddressesCount = chainStats.uniqueAddressesCount;

  if (!chainSaved) {
    // If the chain hasn't been saved yet, save it
    await ctx.store.save(chain);
    chainSaved = true;
  } else {
    // If the chain has been saved, to avoid unnecessary saves, make sure that
    // there are new addresses or transactions before saving it again
    if (addresses.size > 0 || transactionInfo.transactions.length > 0) {
      await ctx.store.save(chain);
    }
  }

  if (addresses.size > 0) {
    await ctx.store.save([...addresses.values()]);
  }

  if (transactionInfo.transactions.length > 0) {
    await ctx.store.insert(transactionInfo.transactions.map((el) => el[0]));
  }
});

function getTransactionInfo(
  ctx: ProcessorContext<Store>,
  isEvmChain: boolean
): TransactionInfo {
  let transactionsInfo: TransactionInfo = {
    transactions: [],
    addresses: new Set<string>(),
  };

  for (const block of ctx.blocks) {
    // There are four system extrinsics: 'ParachainSystem.set_validation_data', 'Timestamp.set'
    // 'AuthorNoting.set_latest_author_data', and 'AuthorInherent.kick_off_authorship_validation'.
    // System extrinsics will be at index 0-3, so we can skip ahead to the
    // extrinsic starting at index 4
    for (let i = 4; i < block.calls.length; i++) {
      if (block.calls[i].name === evmCalls.ethereum.transact.name) {
        // Process EVM transactions

        // Don't process subcalls
        if (block.calls[i].parentCall) {
          continue;
        }

        const transactionInfo = processEvmTransactions(
          block.header.height,
          block.header.timestamp,
          block.events,
          block.calls[i]
        );

        if (transactionInfo) {
          const {
            transaction,
            transactionAddresses: { sender, receiver },
            addressesFromInternalTxs,
          } = transactionInfo;

          // Save the transaction along with the sender and receiver information
          transactionsInfo.transactions.push([transaction, sender, receiver]);
          // Save the sender and receiver addresses
          transactionsInfo.addresses.add(sender);
          if (receiver !== '') {
            transactionsInfo.addresses.add(receiver);
          }
          // Add any new addresses from internal transactions to the list of addresses to be created
          addressesFromInternalTxs.forEach((address) => {
            transactionsInfo.addresses.add(address);
          });
        }
      } else {
        // Process Substrate transactions

        // No need to process transactions dispatched by the Root origin
        if (block.calls[i].origin.value.__kind === 'Root') {
          continue;
        }

        // Don't process subcalls
        if (block.calls[i].parentCall) {
          continue;
        }

        const transactionInfo = processSubstrateTransactions(
          block.header.height,
          block.header.timestamp,
          block.events,
          block.calls[i],
          isEvmChain
        );

        if (transactionInfo) {
          const {
            transaction,
            transactionAddresses: { sender, receiver },
            addressesFromSubcalls,
          } = transactionInfo;

          // Save the transaction along with the sender and receiver information
          transactionsInfo.transactions.push([transaction, sender, receiver]);
          // Save the sender and receiver addresses
          transactionsInfo.addresses.add(sender);
          if (receiver !== '') {
            transactionsInfo.addresses.add(receiver);
          }

          // Add any new addresses from subcalls to the list of addresses to be created
          addressesFromSubcalls.forEach((address) => {
            transactionsInfo.addresses.add(address);
          });
        }
      }
    }
  }

  return transactionsInfo;
}

function processEvmTransactions(
  blockNo: number,
  timestamp: number | undefined,
  blockEvents: Event[],
  call: Call
):
  | {
      transaction: Transaction;
      transactionAddresses: TransactionAddresses;
      addressesFromInternalTxs: Set<string>;
    }
  | undefined {
  const transactionAddresses: TransactionAddresses = {
    sender: '',
    receiver: '',
  };

  const addressesFromInternalTxs = new Set<string>();

  const transaction = new Transaction({
    id: `${chainId}-${call.id}`,
    chain: undefined,
    blockNo,
    timestamp: `${timestamp}`,
    isEvm: true,
    hash: undefined,
    sender: undefined,
    receiver: undefined,
    gasUsed: BigInt(0),
    type: undefined,
  });

  const extrinsicIndex = call.extrinsicIndex;
  for (const event of blockEvents) {
    if (event.extrinsicIndex == extrinsicIndex) {
      // Extract sender and receiver data from 'Ethereum.Executed' events
      if (event.name === evmEvents.ethereum.executed.name) {
        const { from, to, transactionHash, exitReason } =
          evmEvents.ethereum.executed.v100.decode(event);

        // If the transaction failed, no need to process it
        if (exitReason.__kind !== 'Succeed') {
          return;
        }
        transaction.hash = transactionHash;

        // The addresses will be created separately. So we just need to save and
        // return the addresses involved with the transaction for now
        transactionAddresses.sender = `${chainId}-${from}`;
        transactionAddresses.receiver = `${chainId}-${to}`;
      }

      // Extract weight info from 'System.ExtrinsicSuccess' events. Note: If an EVM
      // transaction fails, it's reported in the 'Ethereum.Executed' event
      if (event.name === evmEvents.system.extrinsicSuccess.name) {
        const {
          dispatchInfo: {
            weight: { refTime },
          },
        } = evmEvents.system.extrinsicSuccess.v100.decode(event);
        transaction.gasUsed = refTime / weightPerGas;
      }

      if (event.name === evmEvents.system.newAccount.name) {
        const { account } = evmEvents.system.newAccount.v100.decode(event);
        addressesFromInternalTxs.add(`${chainId}-${account}`);
      }
    }
  }

  const {
    transaction: {
      value: { input, value, action },
    },
  } = evmCalls.ethereum.transact.v100.decode(call);

  if (action.__kind == 'Call') {
    // In this case, it can be either a contract interaction or a balance transfer
    // If the input is '0x' and the value is greater than 0, it's a balance transfer
    if (input == '0x' && value > 0) {
      transaction.type = TransactionType.BALANCE_TRANSFER;
    } else {
      transaction.type = TransactionType.CONTRACT_CALL;
    }
  } else {
    // Otherwise it's a 'Create'
    transaction.type = TransactionType.CONTRACT_CREATION;
  }

  return { transaction, transactionAddresses, addressesFromInternalTxs };
}

function processSubstrateTransactions(
  blockNo: number,
  timestamp: number | undefined,
  blockEvents: Event[],
  call: Call,
  isEvmChain: boolean
):
  | {
      transaction: Transaction;
      transactionAddresses: TransactionAddresses;
      addressesFromSubcalls: Set<string>;
    }
  | undefined {
  const transaction = new Transaction({
    id: `${chainId}-${call.id}`,
    chain: undefined,
    blockNo,
    timestamp: `${timestamp}`,
    isEvm: false,
    hash: call.extrinsic?.hash,
    sender: undefined,
    receiver: undefined,
    gasUsed: BigInt(0), // EVM only
    type: undefined, // EVM only
  });

  const transactionAddresses: TransactionAddresses = {
    sender: '',
    receiver: '',
  };
  const addressesFromSubcalls = new Set<string>();
  const extrinsicIndex = call.extrinsicIndex;

  if (isEvmChain) {
    // Get the status of the extrinsic
    if (call.extrinsic) {
      if (!call.extrinsic.success) {
        // If the transaction failed, no need to process it
        return;
      }
    }

    // Have to iterate over the block events instead of the call events to get
    // the Extrinsic Success/Extrinsic Failed events to calculate gasUsed
    for (const event of blockEvents) {
      if (event.extrinsicIndex == extrinsicIndex) {
        if (event.name === evmEvents.system.extrinsicSuccess.name) {
          const {
            dispatchInfo: {
              weight: { refTime },
            },
          } = evmEvents.system.extrinsicSuccess.v100.decode(event);
          transaction.gasUsed = refTime / weightPerGas;
        } else if (event.name === events.system.extrinsicFailed.name) {
          // If the transaction failed, no need to process it
          return;
        }
      }
    }

    transactionAddresses.sender = `${chainId}-${call.origin.value.value}`;
    // For balance transfers, lets rely on the `BalanceTransfer` event to get the receiver
    if (
      call.name === evmCalls.balances.transferAll.name ||
      call.name === evmCalls.balances.transferAllowDeath.name ||
      call.name === evmCalls.balances.transferKeepAlive.name
    ) {
      for (const event of call.events) {
        if (
          event.name === evmEvents.balances.transfer.name &&
          event.extrinsicIndex == extrinsicIndex
        ) {
          if (evmEvents.balances.transfer.v100.is(event)) {
            const { to } = evmEvents.balances.transfer.v100.decode(event);
            transactionAddresses.receiver = `${chainId}-${to}`;
          }
        }
      }
    }

    // Process batch transactions to see if we need to add any new addresses as receivers
    if (
      call.name === evmCalls.utility.batch.name ||
      call.name === evmCalls.utility.batchAll.name
    ) {
      // Iterate over the events to check for balance transfers as part of the batch
      for (const event of call.events) {
        if (
          event.name === evmEvents.balances.transfer.name &&
          event.extrinsicIndex == extrinsicIndex
        ) {
          if (evmEvents.balances.transfer.v100.is(event)) {
            const { to } = evmEvents.balances.transfer.v100.decode(event);
            // These addresses would not be the receiver in this case
            addressesFromSubcalls.add(`${chainId}-${to}`);
          }
        }
      }
    }
  } else {
    // Have to iterate over the block events instead of the call events
    // to get the Extrinsic Success/Extrinsic Failed events
    for (const event of blockEvents) {
      if (event.extrinsicIndex == extrinsicIndex) {
        if (event.name === events.system.extrinsicSuccess.name) {
          const {
            dispatchInfo: {
              weight: { refTime },
            },
          } = events.system.extrinsicSuccess.v200.decode(event);
          transaction.gasUsed = refTime / weightPerGas;
        } else if (event.name === events.system.extrinsicFailed.name) {
          // If the transaction failed, no need to process it
          return;
        }
      }
    }
    transactionAddresses.sender = `${chainId}-${ss58
      .codec('substrate')
      .encode(call.origin.value.value)}`;

    // For balance transfers, lets rely on the `BalanceTransfer` event to get the receiver
    if (
      call.name === calls.balances.transferAll.name ||
      call.name === calls.balances.transferAllowDeath.name ||
      call.name === calls.balances.transferKeepAlive.name
    ) {
      for (const event of call.events) {
        if (
          event.name === events.balances.transfer.name &&
          event.extrinsicIndex == extrinsicIndex
        ) {
          if (events.balances.transfer.v200.is(event)) {
            const { to } = events.balances.transfer.v200.decode(event);
            transactionAddresses.receiver = `${chainId}-${ss58
              .codec('substrate')
              .encode(to)}`;
          }
        }
      }
    }

    // Process batch transactions to see if we need to add any new addresses as receivers
    if (
      call.name === calls.utility.batch.name ||
      call.name === calls.utility.batchAll.name
    ) {
      // Iterate over the events to check for balance transfers as part of the batch
      for (const event of call.events) {
        if (
          event.name === events.balances.transfer.name &&
          event.extrinsicIndex == extrinsicIndex
        ) {
          if (events.balances.transfer.v200.is(event)) {
            const { to } = events.balances.transfer.v200.decode(event);
            // These addresses would not be the receiver in this case
            addressesFromSubcalls.add(
              `${chainId}-${ss58.codec('substrate').encode(to)}`
            );
          }
        }
      }
    }
  }

  return {
    transaction,
    transactionAddresses,
    addressesFromSubcalls,
  };
}
