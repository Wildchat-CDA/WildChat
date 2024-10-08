import { DataSource } from 'typeorm';
import { Section } from '../../entity/section.entity';
import { Channel } from '../../entity/channel.entity';

export async function seedSectionChannels(dataSource: DataSource) {
  const sectionRepository = dataSource.getRepository(Section);
  const channelRepository = dataSource.getRepository(Channel);

  const sectionChannelsToEnsure = [
    {
      sectionTitle: 'Tableau des annonces',
      channelTitles: ['Annonces Générales', 'Annonces Administratives'],
    },
    {
      sectionTitle: 'Bureaux',
      channelTitles: ['Bureau du professeur', "Bureau de l'assistant"],
    },
    {
      sectionTitle: 'Tables',
      channelTitles: ['Table principale', 'Table des dailys'],
    },
  ];

  for (const sectionChannelData of sectionChannelsToEnsure) {
    const section = await sectionRepository.findOne({
      where: { title: sectionChannelData.sectionTitle },
    });
    if (section) {
      for (const channelTitle of sectionChannelData.channelTitles) {
        const channel = await channelRepository.findOne({
          where: { title: channelTitle },
        });
        if (channel) {
          section.channels = section.channels || [];
          section.channels.push(channel);
        }
      }
      await sectionRepository.save(section);
    }
  }
}
