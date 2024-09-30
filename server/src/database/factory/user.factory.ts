import { User } from '../../entity/user.entity';
import { faker } from '@faker-js/faker';

export function createUserFactory(): User {
  const user = new User();
  user.name = faker.person.lastName();
  user.firstName = faker.person.firstName();
  user.email = faker.internet.email();
  user.password = faker.internet.password(); // This will be hashed later
  return user;
}
