module.exports = class Data1710915168229 {
    name = 'Data1710915168229'

    async up(db) {
        await db.query(`CREATE TABLE "delegation" ("id" character varying NOT NULL, "block_no" integer NOT NULL, "candidate" text NOT NULL, "account_id" character varying, CONSTRAINT "PK_a2cb6c9b942d68b109131beab44" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_be5a5e334e4fb53a0cab3b0125" ON "delegation" ("account_id") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "delegation" ADD CONSTRAINT "FK_be5a5e334e4fb53a0cab3b01254" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "delegation"`)
        await db.query(`DROP INDEX "public"."IDX_be5a5e334e4fb53a0cab3b0125"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`ALTER TABLE "delegation" DROP CONSTRAINT "FK_be5a5e334e4fb53a0cab3b01254"`)
    }
}
