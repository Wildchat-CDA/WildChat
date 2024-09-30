import { Role } from '../../entity/role.entity';
import { faker } from '@faker-js/faker';

export function createRoleFactory(): Role {
  const role = new Role();
  role.name = faker.helpers.arrayElement([
    'professeur',
    'eleve',
    'assistant professeur',
  ]);
  return role;
}
