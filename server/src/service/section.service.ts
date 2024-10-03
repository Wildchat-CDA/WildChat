import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from '../entity/section.entity';
import { Channel } from '../entity/channel.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  async findAll(): Promise<Section[]> {
    return await this.sectionRepository.find({
      relations: ['channels'],
    });
  }

  async findAllTopicAndSectionForClassRoom() {
    return await this.sectionRepository.find({
      where: { isClassRoom: true },
      relations: ['channels', 'channels.config'],
      order: { order: 'ASC' },
    });
  }

  async findAllTopicAndSectionForLibrary() {
    return await this.sectionRepository.find({
      where: { isClassRoom: false },
      relations: ['channels', 'channels.config'],
      order: { order: 'ASC' },
    });
  }

  async update(section: Section, sectionId: number): Promise<UpdateResult> {
    return await this.sectionRepository.update(sectionId, section);
  }

  async delete(sectionId: number): Promise<DeleteResult> {
    return await this.sectionRepository.delete(sectionId);
  }
}
