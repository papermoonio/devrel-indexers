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
    @Arg('date', { nullable: true }) date: string, // If no date, get the current totals
    @Arg('limit', { nullable: true }) limit: number, // If no limit, get all results
    @Arg('offset', { nullable: true }) offset: number // If no offset, get results starting from index 0
  ): Promise<UserStats[]> {
    const manager = await this.tx();

    // Make sure we're getting all transactions up until EOD of the provided date
    let dataToDate = new Date();
    if (date) {
      dataToDate = new Date(date);
      dataToDate.setUTCHours(23, 59, 59, 999);
    }

    let query = `
      SELECT 
        "address"."address" AS address,
        SUM(CASE WHEN "transaction"."type" = 'CONTRACT_CALL' THEN 1 ELSE 0 END) AS "totalContractCalls",
        COUNT("transaction"."id") AS "totalTransactions",
        SUM("transaction"."gas_used") AS "totalGasConsumed",
        ARRAY_AGG(DISTINCT "transaction"."chain_id") AS "interactedAppchains"
      FROM "transaction"
      LEFT JOIN "address" ON "address"."id" = "transaction"."sender_id"
      WHERE CAST("transaction"."timestamp" AS BIGINT) <= ${dataToDate.getTime()} AND "address"."address" IN (${
      "'" + addresses.join("','") + "'"
    })
      GROUP BY "address"."address"
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
