import { Channel } from '../../entity/channel.entity';
import { faker } from '@faker-js/faker';

export function createChannelFactory(): Channel {
  const channel = new Channel();
  channel.uuid = faker.string.uuid();
  channel.title = faker.lorem.words(2);
  channel.slot = faker.number.int({ min: 1, max: 10 });
  // Note: config and sections would need to be set separately
  return channel;
}
