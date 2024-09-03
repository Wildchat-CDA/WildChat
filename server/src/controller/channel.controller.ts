import { Controller, Post, Get, Body } from '@nestjs/common';
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
}
