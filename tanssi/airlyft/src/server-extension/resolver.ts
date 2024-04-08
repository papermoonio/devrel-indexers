import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql';
import type { EntityManager } from 'typeorm';
import { Transaction } from '../model';

// To use logging, uncomment these two lines:
// import { createLogger } from '@subsquid/logger';
// const LOG = createLogger('sqd:graphql-server:my-resolver');

@ObjectType()
class UserStats {
  @Field(() => String)
  address!: string;

  @Field(() => [String])
  interactedAppchains!: string[];

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

  @Query(() => [UserStats]) // Decorate with appropriate return type
  async userStats(
    @Arg('addresses', () => [String]) addresses: string[],
    @Arg('limit', { nullable: true }) limit: number, // If no limit, get all results
    @Arg('offset', { nullable: true }) offset: number // If no offset, get results starting from index 0
  ): Promise<UserStats[]> {
    const manager = await this.tx();

    let query = `
      SELECT
        address.address,
        SUM(address.total_contract_calls) AS "totalContractCalls",
        SUM(address.total_transactions) AS "totalTransactions",
        SUM(address.total_gas_used) AS "totalGasConsumed",
        ARRAY_AGG(DISTINCT address.chain_id) AS "interactedAppchains"
      FROM
        address
      WHERE
        address.address IN (${"'" + addresses.join("','") + "'"}) 
      GROUP BY
        address.address
        ORDER BY "totalTransactions" DESC
    `;

    if (offset) {
      query += `
        OFFSET ${offset}
      `;
    }

    if (limit) {
      query += `
        LIMIT ${limit}
      `;
    }

    const results: UserStats[] = await manager
      .getRepository(Transaction)
      .query(query);
    return results;
  }
}
