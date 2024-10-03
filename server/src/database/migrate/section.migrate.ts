import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSectionTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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

import { DataSource } from 'typeorm';
import { Section } from '../../entity/section.entity';

export async function clearSections(dataSource: DataSource) {
  const sectionRepository = dataSource.getRepository(Section);
  await sectionRepository.clear();
  console.log('Toutes les sections ont été supprimées');
}
