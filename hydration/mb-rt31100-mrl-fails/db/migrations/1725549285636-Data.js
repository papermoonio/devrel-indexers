module.exports = class Data1725549285636 {
    name = 'Data1725549285636'

    async up(db) {
        await db.query(`CREATE TABLE "xcm" ("id" character varying NOT NULL, "hash" text NOT NULL, "sender" text NOT NULL, "dest" integer NOT NULL, "asset" text NOT NULL, "amount" numeric NOT NULL, "asset_idhdx" integer NOT NULL, "asset_name" text NOT NULL, CONSTRAINT "PK_ad3d0a5316c92c614f08c603519" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "xcm"`)
    }
}
