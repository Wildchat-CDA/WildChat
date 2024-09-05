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
    return await this.sectionRepository.find();
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

      console.log(newChannel, 'nouveau channel');

      await this.configRepository.save(newConfig);

      const savedChannel = await this.channelRepository.save(newChannel);

      console.log(savedChannel, 'channel saved');

      newChannels.push(savedChannel);
    }

    section.channels = newChannels;
    return await this.sectionRepository.save(section);
  }
}
