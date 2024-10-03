import { DataSource } from 'typeorm';
import { updateRoles } from '../migrate/role.migrate';

export const rolesToEnsure = [
  'professeur',
  'eleve',
  'assistant professeur',
  'gestionnaire',
];

export async function seedRoles(dataSource: DataSource) {
  await updateRoles(dataSource, rolesToEnsure);
}
