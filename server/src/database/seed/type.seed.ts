import { DataSource } from 'typeorm';
import { updateTypes } from '../migrate/type.migrate';

export const typesToEnsure = ['private', 'public'];

export async function seedTypes(dataSource: DataSource) {
  await updateTypes(dataSource, typesToEnsure);
}
