import { DataSource } from 'typeorm';
import { Channel } from '../../entity/channel.entity';
import { Config } from '../../entity/config.entity';
import { Section } from '../../entity/section.entity';
import { createChannelFactory } from '../factory/channel.factory';

export async function seedChannels(dataSource: DataSource) {
  const channelRepository = dataSource.getRepository(Channel);
  const configRepository = dataSource.getRepository(Config);
  const sectionRepository = dataSource.getRepository(Section);

  const existingChannels = await channelRepository.find();

  if (existingChannels.length === 0) {
    const configs = await configRepository.find();
    const sections = await sectionRepository.find();

    const channels = [];

    for (let i = 0; i < 5; i++) {
      const channel = createChannelFactory();
      channel.config = configs[Math.floor(Math.random() * configs.length)];
      channel.sections = sections.slice(0, Math.floor(Math.random() * 3) + 1);
      channels.push(channel);
    }

    await channelRepository.save(channels);
    console.log('Channels seeded successfully');
  } else {
    console.log('Channels already exist, skipping seeding');
  }
}
