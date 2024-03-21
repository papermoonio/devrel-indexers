module.exports = class Data1711031192539 {
    name = 'Data1711031192539'

    async up(db) {
        await db.query(`CREATE TABLE "parachain_id_registration" ("id" character varying NOT NULL, "block_no" integer NOT NULL, "timestamp" text NOT NULL, "para_id" integer NOT NULL, "sender" text NOT NULL, CONSTRAINT "PK_12af0b769c1595721196ce10a08" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "parachain_id_registration"`)
    }
}
