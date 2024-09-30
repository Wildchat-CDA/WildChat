import { Config } from '../../entity/config.entity';
import { faker } from '@faker-js/faker';

export function createConfigFactory(): Config {
  const config = new Config();
  config.maxSlot = faker.number.int({ min: 1, max: 6 });
  return config;
}
