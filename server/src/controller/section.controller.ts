import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { SectionService } from '../service/section.service';
import { Section } from '../entity/section.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('/section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get('/')
  async findAll(): Promise<Section[]> {
    return await this.sectionService.findAll();
  }

  @Get('/classroom')
  async findAllTopicAndSectionForClassRoom() {
    return await this.sectionService.findAllTopicAndSectionForClassRoom();
  }

  @Get('/library')
  async findAllTopicAndSectionForLibrary() {
    return await this.sectionService.findAllTopicAndSectionForLibrary();
  }

  @Put('/:sectionId')
  async update(
    @Body() section: Section,
    @Param('sectionId') sectionId: number,
  ): Promise<UpdateResult> {
    return await this.sectionService.update(section, sectionId);
  }

  @Delete('/:sectionId')
  async delete(@Param('sectionId') sectionId: number): Promise<DeleteResult> {
    return await this.sectionService.delete(sectionId);
  }
}
