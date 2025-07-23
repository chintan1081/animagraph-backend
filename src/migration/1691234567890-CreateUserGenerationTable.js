export class CreateUserGenerationTable1691234567890 {
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE "user_generation" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "prompt" varchar NOT NULL,
        "codeGenerated" text NOT NULL,
        "videoUrl" varchar NOT NULL
      )
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
      DROP TABLE "user_generation"
    `);
  }
}
