import { InjectRepository } from '@nestjs/typeorm';
import { Section } from '../entity/section.entity';
import { Repository } from 'typeorm';
import { Channel } from 'src/entity/channel.entity';

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
}
