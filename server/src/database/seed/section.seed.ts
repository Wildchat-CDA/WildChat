import { DataSource } from 'typeorm';
import { updateSections } from '../migrate/section.migrate';

export async function seedSections(dataSource: DataSource) {
  await updateSections(dataSource);
}
