module.exports = class Data1669913785568 {
  name = 'Data1669913785568'

  async up(db) {
    await db.query(`CREATE TABLE "burned_fees" ("id" character varying NOT NULL, "amount" numeric NOT NULL, "timestamp" numeric NOT NULL, CONSTRAINT "PK_c8c6298440f9b6019002d158164" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "burned_fees"`)
  }
}
