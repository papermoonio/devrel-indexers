module.exports = class Data1712592425601 {
    name = 'Data1712592425601'

    async up(db) {
        await db.query(`CREATE TABLE "address" ("id" character varying NOT NULL, "address" text NOT NULL, "is_contract" boolean NOT NULL, "total_transactions" numeric NOT NULL, "total_contract_calls" numeric NOT NULL, "total_contracts_created" numeric NOT NULL, "total_gas_used" numeric NOT NULL, "chain_id" character varying, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_0a1ed89729fa10ba8b81b99f30" ON "address" ("address") `)
        await db.query(`CREATE INDEX "IDX_e0de7f0c557600a1615f00ff17" ON "address" ("chain_id") `)
        await db.query(`CREATE TABLE "transaction" ("id" character varying NOT NULL, "block_no" integer NOT NULL, "timestamp" text NOT NULL, "is_evm" boolean NOT NULL, "hash" text NOT NULL, "gas_used" numeric NOT NULL, "type" character varying(17), "chain_id" character varying, "sender_id" character varying, "receiver_id" character varying, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_45d29ac87dac85293d3c4ab6bd" ON "transaction" ("chain_id") `)
        await db.query(`CREATE INDEX "IDX_91a42be8fb1ac791a24fdf6504" ON "transaction" ("sender_id") `)
        await db.query(`CREATE INDEX "IDX_7f8c694d3eb02b8fc73d85b033" ON "transaction" ("receiver_id") `)
        await db.query(`CREATE TABLE "chain" ("id" character varying NOT NULL, "total_transactions" numeric NOT NULL, "total_contract_calls" numeric NOT NULL, "total_contracts_created" numeric NOT NULL, "total_gas_used" numeric NOT NULL, "unique_addresses_count" numeric NOT NULL, CONSTRAINT "PK_8e273aafae283b886672c952ecd" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_e0de7f0c557600a1615f00ff171" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_45d29ac87dac85293d3c4ab6bda" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_91a42be8fb1ac791a24fdf65048" FOREIGN KEY ("sender_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_7f8c694d3eb02b8fc73d85b0330" FOREIGN KEY ("receiver_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "address"`)
        await db.query(`DROP INDEX "public"."IDX_0a1ed89729fa10ba8b81b99f30"`)
        await db.query(`DROP INDEX "public"."IDX_e0de7f0c557600a1615f00ff17"`)
        await db.query(`DROP TABLE "transaction"`)
        await db.query(`DROP INDEX "public"."IDX_45d29ac87dac85293d3c4ab6bd"`)
        await db.query(`DROP INDEX "public"."IDX_91a42be8fb1ac791a24fdf6504"`)
        await db.query(`DROP INDEX "public"."IDX_7f8c694d3eb02b8fc73d85b033"`)
        await db.query(`DROP TABLE "chain"`)
        await db.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_e0de7f0c557600a1615f00ff171"`)
        await db.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_45d29ac87dac85293d3c4ab6bda"`)
        await db.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_91a42be8fb1ac791a24fdf65048"`)
        await db.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_7f8c694d3eb02b8fc73d85b0330"`)
    }
}
