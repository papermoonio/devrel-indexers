module.exports = class Data1670906420877 {
  name = 'Data1670906420877'

  async up(db) {
    await db.query(`CREATE TABLE "contract_address" ("id" character varying NOT NULL, "timestamp" text NOT NULL, "block_no" text NOT NULL, CONSTRAINT "PK_4fe09bad72ca133d6bfde013adb" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "address" ("id" character varying NOT NULL, "timestamp" text NOT NULL, "block_no" text NOT NULL, "account_id" text NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "contract_address"`)
    await db.query(`DROP TABLE "address"`)
  }
}
