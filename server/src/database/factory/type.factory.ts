import { Type } from '../../entity/type.entity';
import { faker } from '@faker-js/faker';

export function createTypeFactory(): Type {
  const type = new Type();
  type.name = faker.word.noun();
  return type;
}
