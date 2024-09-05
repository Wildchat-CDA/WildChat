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

  @Post('/topic')
  async createSectionWithChannels(@Body() section: Section): Promise<Section> {
    return await this.sectionService.createSectionWithChannels(section);
  }

  @Post('/classRoom')
  async createClassRoomWithChannels(): Promise<Section> {
    return await this.sectionService.createClassRoomWithChannels();
  }
}
