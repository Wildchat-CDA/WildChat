import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ChannelService } from '../service/channel.service';
import { Channel } from 'src/entity/channel.entity';

@Controller('/channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post('/')
  async create(@Body() channel: Channel): Promise<Channel> {
    return await this.channelService.create(channel);
  }

  @Get('/')
  async findAll(): Promise<Channel[]> {
    return await this.channelService.findAll();
  }

  @Put('/:channelId/config/:configId')
  async addType(
    @Param('configId') configId: number,
    @Param('channelId') channelId: number,
  ) {
    try {
      return await this.channelService.addConfig(channelId, configId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
