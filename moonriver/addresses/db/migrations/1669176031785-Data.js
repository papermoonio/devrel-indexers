module.exports = class Data1669176031785 {
  name = 'Data1669176031785'

  async up(db) {
    await db.query(`CREATE TABLE "staking_reward" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "timestamp" numeric NOT NULL, "account" text NOT NULL, CONSTRAINT "PK_63b6754f195dbb71232f598485b" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "parachain_bond_transfer" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "timestamp" numeric NOT NULL, CONSTRAINT "PK_86dfbdabe5767472b3bb70ae630" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "total_issuance" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "timestamp" numeric NOT NULL, CONSTRAINT "PK_9cdf75245e881dc54db2b9c2553" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "staking_reward"`)
    await db.query(`DROP TABLE "parachain_bond_transfer"`)
    await db.query(`DROP TABLE "total_issuance"`)
  }
}
