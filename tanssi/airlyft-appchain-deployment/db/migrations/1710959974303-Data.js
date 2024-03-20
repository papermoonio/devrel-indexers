module.exports = class Data1710959974303 {
    name = 'Data1710959974303'

    async up(db) {
        await db.query(`ALTER TABLE "parachain_id_registration" DROP COLUMN "timestamp"`)
        await db.query(`ALTER TABLE "parachain_id_registration" ADD "timestamp" text NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "parachain_id_registration" ADD "timestamp" integer`)
        await db.query(`ALTER TABLE "parachain_id_registration" DROP COLUMN "timestamp"`)
    }
}
