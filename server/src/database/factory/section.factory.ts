import { Section } from '../../entity/section.entity';
import { faker } from '@faker-js/faker';

export function createSectionFactory(): Section {
  const section = new Section();
  section.title = faker.lorem.words(2);
  section.isClassRoom = faker.datatype.boolean();
  section.order = faker.number.int({ min: 1, max: 100 });
  return section;
}
