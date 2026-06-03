module.exports = class Data1777625917068 {
    name = 'Data1777625917068'

    async up(db) {
        await db.query(`ALTER TABLE "parachain_bond_transfer" ADD "destination" text NOT NULL`)
        await db.query(`ALTER TABLE "parachain_bond_transfer" ADD "destination_address" text NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "parachain_bond_transfer" DROP COLUMN "destination"`)
        await db.query(`ALTER TABLE "parachain_bond_transfer" DROP COLUMN "destination_address"`)
    }
}
