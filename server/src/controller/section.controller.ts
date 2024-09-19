import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  NotFoundException,
  ConflictException,
  Delete,
} from '@nestjs/common';
import { SectionService } from '../service/section.service';
import { Section } from 'src/entity/section.entity';
import { Channel } from 'src/entity/channel.entity';
import { UpdateResult } from 'typeorm';

@Controller('/section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post('/') /**Pour créer une section sans channel */ async create(
    @Body() sectionData: Section,
  ): Promise<Section> {
    return await this.sectionService.create(sectionData);
  }

  @Get('/')
  async findAll(): Promise<Section[]> {
    return await this.sectionService.findAll();
  }

  @Put('/:sectionId')
  async update(
    @Body() section: Section,
    @Param('sectionId') sectionId: number,
  ): Promise<UpdateResult> {
    return await this.sectionService.update(section, sectionId);
  }

  @Put('/:sectionId/order')
  async updateSectionsOrder(
    @Body() sectionOrder: Partial<Section>,
    @Param('sectionId') sectionId: number,
  ): Promise<void> {
    return await this.sectionService.updateSectionsOrder(
      sectionOrder,
      sectionId,
    );
  }

  @Delete('/:sectionId')
  async delete(@Param('sectionId') sectionId: number): Promise<void> {
    try {
      await this.sectionService.delete(sectionId);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Put(
    '/:sectionId/channel/:channelId',
  ) /**Pour relier un channel à une section */
  async addSection(
    @Param('channelId') channelId: number,
    @Param('sectionId') sectionId: number,
  ) {
    try {
      return await this.sectionService.addSection(channelId, sectionId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('/topic') /**Topic bibliothèque + les channels */
  async createSectionWithChannels(@Body() section: Section): Promise<Section> {
    try {
      return await this.sectionService.createSectionWithChannels(section);
    } catch (error) {
      if (error) throw new ConflictException(error.message);
    }
  }

  @Post(
    '/:sectionId/topic/channel',
  ) /**La création de channel pour les topics et la salle de classe */
  async createChannelInTopic(
    @Param('sectionId') sectionId: number,
    @Body() channel: Channel,
  ): Promise<Channel> {
    try {
      return await this.sectionService.createChannelIntopic(sectionId, channel);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(
    '/:sectionId/topic/channel/:channelId',
  ) /**La modification d'un channel pour les topics de la bibliothèque et de la salle de classe */
  async editChannelInSection(
    @Param('sectionId') sectionId: number,
    @Param('channelId') channelId: number,
    @Body('title') newTitle: string,
    @Body('slot') newSlot: number,
  ): Promise<Channel> {
    try {
      return await this.sectionService.editChannelInSection(
        sectionId,
        channelId,
        newTitle,
        newSlot,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('/classRoom') /**Création de la salle de classe avec les channels */
  async createClassRoomWithChannels(): Promise<Section> {
    return await this.sectionService.createClassRoomWithChannels();
  }

  @Get(
    '/classroom',
  ) /**Liste de toutes les sections et channels de la salle de classe */
  async findAllTopicAndSectionForClassRoom() {
    return await this.sectionService.findAllTopicAndSectionForClassRoom();
  }

  @Get(
    '/library',
  ) /**Liste de toutes les sections et channels de la bibliothèque */
  async findAllTopicAndSectionForLibrary() {
    return await this.sectionService.findAllTopicAndSectionForLibrary();
  }

  @Get('/topic') /**Liste de toutes les sections et de toutes les channels */
  async findAllTopicAndSection() {
    return await this.sectionService.findAllTopicAndSection();
  }
}
