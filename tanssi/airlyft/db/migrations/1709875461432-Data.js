module.exports = class Data1709875461432 {
    name = 'Data1709875461432'

    async up(db) {
        await db.query(`CREATE TABLE "address" ("id" character varying NOT NULL, "chain_id" text NOT NULL, "is_contract" boolean NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "transaction" ("id" character varying NOT NULL, "chain_id" text NOT NULL, "block_no" integer NOT NULL, "evm" boolean NOT NULL, "is_success" boolean NOT NULL, "hash" text, "sender" text, "receiver" text, "gas_used" numeric, "type" text, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "address"`)
        await db.query(`DROP TABLE "transaction"`)
    }
}
