import { Location } from '../../entity/location.entity';
import { faker } from '@faker-js/faker';

export function createLocationFactory(): Location {
  const location = new Location();
  location.name = faker.location.city();
  return location;
}
