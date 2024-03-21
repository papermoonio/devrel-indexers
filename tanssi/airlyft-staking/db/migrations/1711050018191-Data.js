module.exports = class Data1711050018191 {
    name = 'Data1711050018191'

    async up(db) {
        await db.query(`CREATE TABLE "delegation" ("id" character varying NOT NULL, "block_no" integer NOT NULL, "timestamp" text NOT NULL, "candidate" text NOT NULL, "account_id" character varying, CONSTRAINT "PK_a2cb6c9b942d68b109131beab44" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_be5a5e334e4fb53a0cab3b0125" ON "delegation" ("account_id") `)
        await db.query(`CREATE TABLE "undelegation" ("id" character varying NOT NULL, "block_no" integer NOT NULL, "timestamp" text NOT NULL, "candidate" text NOT NULL, "account_id" character varying, CONSTRAINT "PK_2abb7fc49a5ae1f7f9eaf0360a9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d03aae3f3500fe5205d7b53263" ON "undelegation" ("account_id") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "delegation" ADD CONSTRAINT "FK_be5a5e334e4fb53a0cab3b01254" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "undelegation" ADD CONSTRAINT "FK_d03aae3f3500fe5205d7b532637" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "delegation"`)
        await db.query(`DROP INDEX "public"."IDX_be5a5e334e4fb53a0cab3b0125"`)
        await db.query(`DROP TABLE "undelegation"`)
        await db.query(`DROP INDEX "public"."IDX_d03aae3f3500fe5205d7b53263"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`ALTER TABLE "delegation" DROP CONSTRAINT "FK_be5a5e334e4fb53a0cab3b01254"`)
        await db.query(`ALTER TABLE "undelegation" DROP CONSTRAINT "FK_d03aae3f3500fe5205d7b532637"`)
    }
}
