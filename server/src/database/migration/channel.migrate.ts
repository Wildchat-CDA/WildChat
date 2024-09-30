import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class ChannelMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('channel', true);
    await queryRunner.createTable(
      new Table({
        name: 'channel',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'uuid',
            type: 'uuid',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'slot',
            type: 'int',
          },
          {
            name: 'configId',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'channel',
      new TableForeignKey({
        columnNames: ['configId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'config',
        onDelete: 'CASCADE',
      }),
    );

    // Create junction table for many-to-many relationship with Section
    await queryRunner.createTable(
      new Table({
        name: 'channel_sections_section',
        columns: [
          {
            name: 'channelId',
            type: 'int',
          },
          {
            name: 'sectionId',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'channel_sections_section',
      new TableForeignKey({
        columnNames: ['channelId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'channel',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'channel_sections_section',
      new TableForeignKey({
        columnNames: ['sectionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'section',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('channel');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('configId') !== -1,
    );
    await queryRunner.dropForeignKey('channel', foreignKey);
    await queryRunner.dropTable('channel_sections_section');
    await queryRunner.dropTable('channel');
  }
}
