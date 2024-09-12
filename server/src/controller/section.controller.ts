import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { SectionService } from '../service/section.service';
import { Section } from 'src/entity/section.entity';
import { Channel } from 'src/entity/channel.entity';

@Controller('/section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post('/')
  async create(@Body() section: Section): Promise<Section> {
    return await this.sectionService.create(section);
  }

  @Get('/')
  async findAll(): Promise<Section[]> {
    return await this.sectionService.findAll();
  }

  @Put('/:sectionId/channel/:channelId')
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
    return await this.sectionService.createSectionWithChannels(section);
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
  ) /**La modification d'un channel pour les topics et la salle de classe */
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
}
