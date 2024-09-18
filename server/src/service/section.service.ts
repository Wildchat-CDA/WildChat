import { InjectRepository } from '@nestjs/typeorm';
import { Section } from '../entity/section.entity';
import { MoreThanOrEqual, Repository, UpdateResult } from 'typeorm';
import { Channel } from 'src/entity/channel.entity';
import { v4 as uuidv4 } from 'uuid';
import { Config } from '../entity/config.entity';
import { Type } from '../entity/type.entity';
import { ConflictException } from '@nestjs/common';

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

  async create(sectionData: Section): Promise<Section> {
    const sections = await this.sectionRepository.find({
      order: { order: 'DESC' },
      take: 1,
    });

    const lastSection = sections[0];
    console.log('last section', lastSection);
    const newSection = await this.sectionRepository.save({
      ...sectionData,
      order: lastSection.order + 1,
    });

    return await this.sectionRepository.save(newSection);
  }

  async findAll(): Promise<Section[]> {
    return await this.sectionRepository.find({
      relations: ['channels'],
    });
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
    if (
      await this.sectionRepository.findOne({
        where: { order: sectionData.order },
      })
    ) {
      throw new ConflictException('This order number already exists', {
        cause: new Error(),
        description: 'Duplicate entry',
      });
    } else {
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

        await this.configRepository.save(newConfig);

        const savedChannel = await this.channelRepository.save(newChannel);

        newChannels.push(savedChannel);
      }

      section.channels = newChannels;

      return await this.sectionRepository.save(section);
    }
  }

  async createClassRoomWithChannels(): Promise<any> {
    const sections = [
      { title: 'Tableau des annonces', isClassRoom: true, order: 1 },
      { title: 'Bureaux', isClassRoom: true, order: 2 },
      { title: 'Tables', isClassRoom: true, order: 3 },
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
        isClassRoom: sectionData.isClassRoom,
        relations: ['channels'],
      });

      const channels = channelsPerSection[sectionData.title];

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

  async findAllTopicAndSection() {
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

  async createChannelIntopic(sectionId: number, channelData: Channel) {
    const section = await this.sectionRepository.findOneBy({ id: sectionId });

    if (!section) {
      throw new Error('Topic not found');
    } else {
      const channel = this.channelRepository.create({
        ...channelData,
        uuid: uuidv4(),
      });
      channel.sections = [section];

      return this.channelRepository.save(channel);
    }
  }

  async editChannelInSection(
    sectionId: number,
    channelId: number,
    newtTitle: string,
    newSlot: number,
  ): Promise<any> {
    const channel = await this.channelRepository.findOneBy({ id: channelId });
    const section = await this.sectionRepository.findOneBy({ id: sectionId });

    if (!section) throw new Error('channel not found');
    if (!channel) throw new Error('channel not found');

    const updatedChannel = await this.channelRepository.update(channelId, {
      title: newtTitle,
      slot: newSlot,
    });

    return updatedChannel;
  }

  async update(section: Section, sectionId: number): Promise<UpdateResult> {
    const sectionToUpdate = await this.sectionRepository.findOneBy({
      id: sectionId,
    });

    if (!sectionToUpdate) throw new Error('section not found');

    const sectionUpdated = await this.sectionRepository.update(
      sectionId,
      section,
    );

    return sectionUpdated;
  }

  async updateSectionsOrder(sectionOrder: Partial<Section>, sectionId: number) {
    const targetOrder = sectionOrder.order;
    console.log(targetOrder, 'targetOrder');

    const conflictingSection = await this.sectionRepository.findOne({
      where: { order: targetOrder },
    });

    console.log(conflictingSection, 'conflictingSection');
    if (conflictingSection) {
      const affectedSections = await this.sectionRepository.find({
        where: { order: MoreThanOrEqual(targetOrder) },
        order: { order: 'DESC' },
      });

      console.log(affectedSections, 'affectedSections');
      for (const affectedSection of affectedSections) {
        await this.sectionRepository.update(affectedSection.id, {
          order: affectedSection.order + 1,
        });
      }
    }

    await this.sectionRepository.update(sectionId, { order: targetOrder });
  }

  async delete(sectionId: number): Promise<void> {
    const sectionToDelete = await this.sectionRepository.findOne({
      where: { id: sectionId },
      relations: ['channels', 'channels.config'],
    });

    if (!sectionToDelete) throw new Error('section not found');

    const channelsToDelete = sectionToDelete.channels;

    if (channelsToDelete && channelsToDelete.length > 0) {
      await this.channelRepository.remove(channelsToDelete);
    }

    for (const channel of channelsToDelete) {
      const configToDelete = channel.config;
      if (configToDelete) {
        await this.configRepository.remove(configToDelete);
      }
    }

    await this.sectionRepository.remove(sectionToDelete);
  }
}
