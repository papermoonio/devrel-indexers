import { Store, TypeormDatabase } from '@subsquid/typeorm-store';
import { In } from 'typeorm';
import { processor, Call, Event, ProcessorContext } from './processor';
import {
  Address,
  Chain,
  Transaction,
  TransactionType,
} from '../model';
import { calls, events } from '../types';

/** --------------------------------------- DOCUMENTATION -----------------------------------------

This processor is set up to handle multiple chains: https://docs.subsquid.io/sdk/resources/basics/multichain/
To test it out with multiple chains locally, you will need to take the following steps:
  
  1. Create a directory for each chain in the `src` directory
  2. In each directory, add a copy of the `main.ts` and processor.ts` files
  3. In `main.ts` for each chain dir:
      a. Update the CHAIN_ID
      b. Update > processor.run(new TypeormDatabase(), async (ctx) => {} 
         to be  > processor.run(new TypeormDatabase({stateSchema: `${CHAIN_ID}_processor`}), async ctx => {}    
  4. In `processor.ts` of each chain dir
      a. Update the RPC_ENDPOINT
  5. In `commands.json` add a command for starting up each processor. There must be one command per chain:
        "process:INSERT_CHAIN_ID": {
          "deps": ["build", "migration:apply"],
          "cmd": ["node", "lib/INSERT_CHAIN_DIR_NAME/main.js"]
        }

Note:
- Internal transactions on the EVM are not accounted for. However, any new addresses created from
  internal transactions are accounted for
- It counts each subcall of a batch transaction as a transaction. If you don't want to get count
  subcalls in the total transaction count, you can filter out any transactions where isSubcall = true

----------------------------------------------------------------------------------------------- **/

const weightPerGas = BigInt(25000);
const chainId = '3092';

type Tuple<T, K, L> = [T, K, L];
interface TransactionInfo {
  transactions: Tuple<Transaction, string, string>[]; // The transaction, the sender, the receiver
  addresses: Set<string>;
}

interface TransactionAddresses {
  sender: string;
  receiver: string;
}

processor.run(
  new TypeormDatabase({
    stateSchema: `${chainId}-processor`,
    isolationLevel: 'READ COMMITTED',
  }),
  async (ctx) => {
    const transactionInfo = getTransactionInfo(ctx);

    // Get the chain item from the database
    let chain = await getChain(ctx);

    // Get the addresses from the database
    // TODO: change addressChainConnections to addresses
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
        chain.uniqueAddressesCount += BigInt(1);
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
      chain.totalTransactions += transactions;
      chain.totalContractCalls += contractCalls;
      chain.totalContractsCreated += contractsCreated;
      chain.totalGasUsed += totalGasUsed;

      // Update the transaction to include the chain now that we have the Chain
      transactionObject.chain = chain;
    }

    await ctx.store.save(chain);
    await ctx.store.save([...addresses.values()]);
    await ctx.store.insert(transactionInfo.transactions.map((el) => el[0]));
  }
);

async function getChain(ctx: ProcessorContext<Store>): Promise<Chain> {
  let chain = await ctx.store.findOneBy(Chain, { id: chainId });
  if (!chain) {
    const newChain = new Chain({
      id: chainId,
      transactions: [],
      totalTransactions: BigInt(0),
      totalContractCalls: BigInt(0),
      totalContractsCreated: BigInt(0),
      totalGasUsed: BigInt(0),
      uniqueAddressesCount: BigInt(0),
      addresses: [],
    });

    // Save the chain and return it
    await ctx.store.insert(newChain);
    return newChain;
  } else {
    return chain;
  }
}

function getTransactionInfo(ctx: ProcessorContext<Store>): TransactionInfo {
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
      if (block.calls[i].name === calls.ethereum.transact.name) {
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
          block.calls[i]
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
      addressesFromInternalTxs: Map<string, string>;
    }
  | undefined {
  const transactionAddresses: TransactionAddresses = {
    sender: '',
    receiver: '',
  };

  // Use a map so we don't have to worry about duplicates
  const addressesFromInternalTxs = new Map();

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
      if (event.name === events.ethereum.executed.name) {
        const { from, to, transactionHash, exitReason } =
          events.ethereum.executed.v100.decode(event);

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
      if (event.name === events.system.extrinsicSuccess.name) {
        const {
          dispatchInfo: {
            weight: { refTime },
          },
        } = events.system.extrinsicSuccess.v100.decode(event);
        transaction.gasUsed = refTime / weightPerGas;
      }

      if (event.name === events.system.extrinsicFailed.name) {
        // If the transaction failed, no need to process it
        return;
      }

      if (event.name === events.system.newAccount.name) {
        const { account } = events.system.newAccount.v100.decode(event);
        addressesFromInternalTxs.set(
          `${chainId}-${account}`,
          `${chainId}-${account}`
        );
      }
    }
  }

  const {
    transaction: {
      value: { input, value, action },
    },
  } = calls.ethereum.transact.v100.decode(call);

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
  call: Call
):
  | {
      transaction: Transaction;
      transactionAddresses: TransactionAddresses;
      addressesFromSubcalls: Map<string, string>;
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
    sender: `${chainId}-${call.origin.value.value}`,
    receiver: '',
  };

  const extrinsicIndex = call.extrinsicIndex;
  // Get the status of the extrinsic
  if (call.extrinsic) {
    if (!call.extrinsic.success) {
      // If the transaction failed, no need to process it
      return;
    }
  } else {
    for (const event of blockEvents) {
      if (event.extrinsicIndex == extrinsicIndex) {
        if (event.name === events.system.extrinsicFailed.name) {
          // If the transaction failed, no need to process it
          return;
        }
      }
    }
  }

  // Get the receiver for balance transfers
  if (call.name === calls.balances.transferAll.name) {
    const { dest } = calls.balances.transferAll.v100.decode(call);
    transactionAddresses.receiver = `${chainId}-${dest}`;
  } else if (call.name === calls.balances.transferAllowDeath.name) {
    const { dest } = calls.balances.transferAllowDeath.v100.decode(call);
    transactionAddresses.receiver = `${chainId}-${dest}`;
  } else if (call.name === calls.balances.transferKeepAlive.name) {
    const { dest } = calls.balances.transferKeepAlive.v100.decode(call);
    transactionAddresses.receiver = `${chainId}-${dest}`;
  }

  // Process batch transactions to see if we need to add any new addresses
  // as receivers
  // Use a map so we don't have to worry about duplicates
  const addressesFromSubcalls = new Map();
  if (call.name === calls.utility.batch.name) {
    // For the batch function, some subcalls can fail while others pass.
    // Need to ensure that we aren't accounting for any failed subcalls
    // Iterate over the block events to see if there is a Batch.Interrupted event
    let interruptedIndex = null;
    for (const event of blockEvents) {
      if (event.name === events.utility.batchInterrupted.name) {
        interruptedIndex = event.args.index;
      }
    }

    const subcalls = call.args.calls;
    for (let i = 0; i < subcalls.length; i++) {
      const subcall = subcalls[i];
      // If the subcall failed, we don't need to get any data from it
      if (interruptedIndex && i >= interruptedIndex) {
        continue;
      } else {
        // If the subcall was successful, we need to see if there are any receiving addresses
        if (subcall.__kind === 'Balances') {
          if (
            subcall.value.__kind === 'transfer_all' ||
            subcall.value.__kind === 'transfer_allow_death' ||
            subcall.value.__kind === 'transfer_keep_alive'
          )
            addressesFromSubcalls.set(
              `${chainId}-${subcall.value.dest}`,
              `${chainId}-${subcall.value.dest}`
            );
        }
      }
    }
  } else if (call.name === calls.utility.batchAll.name) {
    // For the batch all function, all subcalls will pass
    const subcalls = call.args.calls;
    for (const subcall of subcalls) {
      if (subcall.__kind === 'Balances') {
        if (
          subcall.value.__kind === 'transfer_all' ||
          subcall.value.__kind === 'transfer_allow_death' ||
          subcall.value.__kind === 'transfer_keep_alive'
        )
          addressesFromSubcalls.set(
            `${chainId}-${subcall.value.dest}`,
            `${chainId}-${subcall.value.dest}`
          );
      }
    }
  }

  return {
    transaction,
    transactionAddresses,
    addressesFromSubcalls,
  };
}
