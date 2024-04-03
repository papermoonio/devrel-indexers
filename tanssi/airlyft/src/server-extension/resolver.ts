import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql';
import type { EntityManager } from 'typeorm';
import { Between, LessThanOrEqual } from 'typeorm';
import { AddressChainConnection, Transaction, TransactionType } from '../model';
import { createLogger } from '@subsquid/logger';

/**
 * We need the custom resolver to get the following pieces of data:
 *
 * - The total number of transactions across all appchains
 * - The total number of contract calls across all appchains
 * - The total gas consumed across all appchains
 *
 * When we've got those things down, we need to be able to get the daily transaction count
 * and therefore the ranking of addresses by daily transactions for a given day.
 *
 */

const LOG = createLogger('sqd:graphql-server:my-resolver');

@ObjectType()
class UserTotals {
  @Field(() => String)
  address!: string;

  @Field(() => String)
  numberOfAppchains!: string;

  @Field(() => String)
  totalTransactions!: string;

  @Field(() => String)
  totalContractCalls!: string;

  @Field(() => String)
  totalGasConsumed!: string;
}

@ObjectType()
class DailyTransactionRanking {
  @Field(() => String)
  date!: string;

  @Field(() => String)
  address!: string;

  @Field(() => String)
  numberOfAppchains!: string;

  @Field(() => String)
  totalTransactions!: string;

  @Field(() => String)
  totalContractCalls!: string;

  @Field(() => String)
  totalGasConsumed!: string;
}

@Resolver()
export class UserLeaderboardResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => [UserTotals])
  async userTotals(
    @Arg('addresses', () => [String]) addresses: string[]
  ): Promise<UserTotals[]> {
    const manager = await this.tx();
    const results: UserTotals[] = [];

    for (const address of addresses) {
      const [transactions, totalTransactions] = await manager
        .getRepository(Transaction)
        .findAndCount({
          where: {
            sender: {
              address: {
                id: address,
              },
            },
          },
        });

      // Calculate total gas used by summing up gasUsed field of all transactions
      let totalGasConsumed = 0n;
      for (const transaction of transactions) {
        totalGasConsumed += transaction.gasUsed;
      }

      const [___, totalContractCalls] = await manager
        .getRepository(Transaction)
        .findAndCount({
          where: {
            sender: {
              address: {
                id: address,
              },
            },
            type: TransactionType.CONTRACT_CALL,
          },
        });

      const [_, numberOfAppchains] = await manager
        .getRepository(AddressChainConnection)
        .findAndCount({
          where: {
            address: {
              id: address,
            },
          },
        });

      const userTotals: UserTotals = {
        address,
        numberOfAppchains: `${numberOfAppchains}`,
        totalTransactions: `${totalTransactions}`,
        totalContractCalls: `${totalContractCalls}`,
        totalGasConsumed: `${totalGasConsumed}`,
      };
      results.push(userTotals);
    }

    return results;
  }

  @Query(() => [DailyTransactionRanking]) // Decorate with appropriate return type
  async userDailyRanking(
    @Arg('date') date: string
  ): Promise<DailyTransactionRanking[]> {
    const manager = await this.tx();
    const results: DailyTransactionRanking[] = [];

    // Beginning of the day
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const startOfDayMilliseconds = startOfDay.getTime();

    // End of the day
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);
    const endOfDayMilliseconds = endOfDay.getTime();

    // Retrieve transactions for the specified date
    const transactions: Transaction[] = await manager
      .getRepository(Transaction)
      .find({
        where: {
          timestamp: LessThanOrEqual(
            // `${startOfDayMilliseconds}`,
            `${endOfDayMilliseconds}`
          ),
        },
        relations: ['sender.address'],
      });

    // Extract unique sender addresses
    const uniqueAddresses = [
      ...new Set(
        transactions.map((transaction) => transaction.sender.address.id)
      ),
    ];

    // Calculate totals for each sender address
    for (const address of uniqueAddresses) {
      const userTransactions = transactions.filter(
        (transaction) => transaction.sender.address.id === address
      );

      // Extract unique chain IDs from transaction IDs
      const uniqueChainIds = new Set(
        userTransactions.map((transaction) => {
          // Extract the chain ID from the transaction ID
          const chainId = transaction.id.split('-')[0];
          return chainId;
        })
      );

      // Calculate total gas consumed and total contract calls
      let totalGasConsumed = 0n;
      let totalContractCalls = 0;
      for (const transaction of userTransactions) {
        totalGasConsumed += transaction.gasUsed;
        if (transaction.type === TransactionType.CONTRACT_CALL) {
          totalContractCalls++;
        }
      }

      // Build the result object for the address
      const userTotals: DailyTransactionRanking = {
        address,
        date: `${new Date(startOfDayMilliseconds).toISOString()}`,
        numberOfAppchains: `${uniqueChainIds.size}`,
        totalTransactions: userTransactions.length.toString(),
        totalContractCalls: totalContractCalls.toString(),
        totalGasConsumed: totalGasConsumed.toString(),
      };

      results.push(userTotals);
    }

    // Sort the results by totalTransactions in descending order
    results.sort(
      (a, b) => parseInt(b.totalTransactions) - parseInt(a.totalTransactions)
    );

    return results;
  }
}
