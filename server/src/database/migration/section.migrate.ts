import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SectionMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('section', true);
    await queryRunner.createTable(
      new Table({
        name: 'section',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'isClassRoom',
            type: 'boolean',
            default: false,
          },
          {
            name: 'order',
            type: 'int',
            isUnique: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('section');
  }
}
