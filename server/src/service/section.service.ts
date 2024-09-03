import { InjectRepository } from '@nestjs/typeorm';
import { Section } from '../entity/section.entity';
import { Repository } from 'typeorm';
import { Channel } from 'src/entity/channel.entity';
import { v4 as uuidv4 } from 'uuid';

export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
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
        type: 1,
        slot: 1,
      });

      newChannels.push(newChannel);
    }

    console.log(newChannels, 'nouveaux channels');
    section.channels = newChannels;
    return await this.sectionRepository.save(section);
  }
}
