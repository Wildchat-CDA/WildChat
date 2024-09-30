import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class ConfigMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('config', true);
    await queryRunner.createTable(
      new Table({
        name: 'config',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'maxSlot',
            type: 'int',
          },
          {
            name: 'typeId',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'config',
      new TableForeignKey({
        columnNames: ['typeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'type',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('config');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('typeId') !== -1,
    );
    await queryRunner.dropForeignKey('config', foreignKey);
    await queryRunner.dropTable('config');
  }
}
