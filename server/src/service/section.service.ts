import { InjectRepository } from '@nestjs/typeorm';
import { Section } from '../entity/section.entity';
import { Repository } from 'typeorm';
import { Channel } from 'src/entity/channel.entity';
import { v4 as uuidv4 } from 'uuid';
import { Config } from '../entity/config.entity';
import { Type } from '../entity/type.entity';

export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async create(section: Section): Promise<Section> {
    return await this.sectionRepository.save(section);
  }

  async findAll(): Promise<Section[]> {
    return await this.sectionRepository.find({ relations: ['channels'] });
  }

  async addSection(channelId: number, sectionId: number) {
    const channel = await this.channelRepository.findOneBy({ id: channelId });
    const section = await this.sectionRepository.findOneBy({
      id: sectionId,
    });

    section.channels = [channel];

    return await this.sectionRepository.save(section);
  }

  async createSectionWithChannels(sectionData: any) {
    const section = await this.sectionRepository.save(sectionData);

    const channels = [
      'Cours',
      'Exercices',
      'Ressources formateur',
      'Ressources élèves',
    ];

    const newChannels = [];

    for (let i = 0; i < channels.length; i++) {
      const newChannel = this.channelRepository.create({
        uuid: uuidv4(),
        title: channels[i],
        slot: 1,
      });

      const newConfig = this.configRepository.create({
        maxSlot: 1,
        type: await this.typeRepository.findOneBy({ id: 1 }),
      });

      console.log(newConfig, 'nouvelle config');

      newChannel.config = newConfig;

      // console.log(newChannel, 'nouveau channel');

      await this.configRepository.save(newConfig);

      const savedChannel = await this.channelRepository.save(newChannel);

      // console.log(savedChannel, 'channel saved');

      newChannels.push(savedChannel);
    }

    section.channels = newChannels;
    return await this.sectionRepository.save(section);
  }

  async createClassRoomWithChannels(): Promise<any> {
    const sections = [
      { title: 'Tableau des annonces', order: 1 },
      { title: 'Bureaux', order: 2 },
      { title: 'Tables', order: 3 },
    ];

    const channelsPerSection = {
      'Tableau des annonces': [
        'Annonces Générales',
        'Annonces Administratives',
      ],
      Bureaux: ['Bureau du professeur', "Bureau de l'assistant"],
      Tables: ['Table principale', 'Table des dailys'],
    };

    const allSections = [];

    for (const sectionData of sections) {
      const section = await this.sectionRepository.save({
        title: sectionData.title,
        order: sectionData.order,
        relations: ['channels'],
      });

      const channels = channelsPerSection[sectionData.title];

      console.log(channels, 'channels');

      const newChannels = [];

      for (const channelTitle of channels) {
        const newChannel = this.channelRepository.create({
          uuid: uuidv4(),
          title: channelTitle,
          slot: 1,
        });

        const newConfig = this.configRepository.create({
          maxSlot: 1,
          type: await this.typeRepository.findOneBy({ id: 1 }),
        });

        newChannel.config = newConfig;

        await this.configRepository.save(newConfig);
        const savedChannel = await this.channelRepository.save(newChannel);

        newChannels.push(savedChannel);
      }

      section.channels = newChannels;
      allSections.push(section);
    }

    return await this.sectionRepository.save(allSections);
  }
}
