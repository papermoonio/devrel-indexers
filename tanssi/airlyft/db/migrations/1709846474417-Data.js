module.exports = class Data1709846474417 {
    name = 'Data1709846474417'

    async up(db) {
        await db.query(`ALTER TABLE "address" ADD "chain_id" text NOT NULL`)
        await db.query(`ALTER TABLE "transaction" ADD "chain_id" text NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "address" DROP COLUMN "chain_id"`)
        await db.query(`ALTER TABLE "transaction" DROP COLUMN "chain_id"`)
    }
}
