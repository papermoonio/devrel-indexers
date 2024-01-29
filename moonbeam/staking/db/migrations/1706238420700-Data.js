module.exports = class Data1706238420700 {
    name = 'Data1706238420700'

    async up(db) {
        await db.query(`CREATE TABLE "delegation" ("id" character varying NOT NULL, "block_num" integer NOT NULL, "candidate" text NOT NULL, "account_id" character varying, CONSTRAINT "PK_a2cb6c9b942d68b109131beab44" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_be5a5e334e4fb53a0cab3b0125" ON "delegation" ("account_id") `)
        await db.query(`CREATE TABLE "delegator_left" ("id" character varying NOT NULL, "block_num" integer NOT NULL, "account_id" character varying, CONSTRAINT "PK_558b2715b7e9f68bdc6855ae3a7" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_b623d536e2eee0806e03b35001" ON "delegator_left" ("account_id") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "delegation" ADD CONSTRAINT "FK_be5a5e334e4fb53a0cab3b01254" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "delegator_left" ADD CONSTRAINT "FK_b623d536e2eee0806e03b35001a" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "delegation"`)
        await db.query(`DROP INDEX "public"."IDX_be5a5e334e4fb53a0cab3b0125"`)
        await db.query(`DROP TABLE "delegator_left"`)
        await db.query(`DROP INDEX "public"."IDX_b623d536e2eee0806e03b35001"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`ALTER TABLE "delegation" DROP CONSTRAINT "FK_be5a5e334e4fb53a0cab3b01254"`)
        await db.query(`ALTER TABLE "delegator_left" DROP CONSTRAINT "FK_b623d536e2eee0806e03b35001a"`)
    }
}
