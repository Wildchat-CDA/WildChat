import { DataSource } from 'typeorm';
import { Channel } from '../../entity/channel.entity';
import { v4 as uuidv4 } from 'uuid';

export async function updateChannels(
  dataSource: DataSource,
  channelsToEnsure: Partial<Channel>[],
) {
  const channelRepository = dataSource.getRepository(Channel);
  const existingChannels = await channelRepository.find();

  for (const channelData of channelsToEnsure) {
    if (
      !existingChannels.some((channel) => channel.title === channelData.title)
    ) {
      const newChannel = channelRepository.create({
        ...channelData,
        uuid: uuidv4(),
      });
      await channelRepository.save(newChannel);
      console.log(`Channel '${channelData.title}' ajouté`);
    } else {
      console.log(`Channel '${channelData.title}' existe déjà`);
    }
  }

  console.log('Mise à jour des channels terminée');
}

export async function clearChannels(dataSource: DataSource) {
  const channelRepository = dataSource.getRepository(Channel);
  await channelRepository.clear();
  console.log('Tous les channels ont été supprimés');
}
