module.exports = class Data1725491116550 {
    name = 'Data1725491116550'

    async up(db) {
        await db.query(`CREATE TABLE "xcm" ("id" character varying NOT NULL, "chain" integer NOT NULL, "hash" text NOT NULL, CONSTRAINT "PK_ad3d0a5316c92c614f08c603519" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_312960c372b505a2aabeb98502" ON "xcm" ("chain") `)
        await db.query(`CREATE INDEX "IDX_781237586ed37caf81685c1c0e" ON "xcm" ("hash") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "xcm"`)
        await db.query(`DROP INDEX "public"."IDX_312960c372b505a2aabeb98502"`)
        await db.query(`DROP INDEX "public"."IDX_781237586ed37caf81685c1c0e"`)
    }
}
