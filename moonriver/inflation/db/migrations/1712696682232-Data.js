module.exports = class Data1712696682232 {
    name = 'Data1712696682232'

    async up(db) {
        await db.query(`CREATE TABLE "staking_reward" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "timestamp" numeric, "account" text NOT NULL, CONSTRAINT "PK_63b6754f195dbb71232f598485b" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "parachain_bond_transfer" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "timestamp" numeric, CONSTRAINT "PK_86dfbdabe5767472b3bb70ae630" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "burned_fees" ("id" character varying NOT NULL, "amount" numeric NOT NULL, "timestamp" numeric, CONSTRAINT "PK_c8c6298440f9b6019002d158164" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "staking_reward"`)
        await db.query(`DROP TABLE "parachain_bond_transfer"`)
        await db.query(`DROP TABLE "burned_fees"`)
    }
}
