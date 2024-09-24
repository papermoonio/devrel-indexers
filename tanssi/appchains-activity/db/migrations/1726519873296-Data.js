module.exports = class Data1726519873296 {
    name = 'Data1726519873296'

    async up(db) {
        await db.query(`CREATE TABLE "appchain_activity" ("id" character varying NOT NULL, "para_id" integer NOT NULL, "sender" text NOT NULL, "registration_block_number" integer NOT NULL, "registration_timestamp" text NOT NULL, "launch_block_number" integer, "launch_timestamp" text, "decommission_block_number" integer, "decommission_timestamp" text, CONSTRAINT "PK_56c42a88d58ccd71b37903f4980" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "appchain_activity"`)
    }
}
