import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ChannelService } from '../service/channel.service';
import { Channel } from 'src/entity/channel.entity';
import { Config } from 'src/entity/config.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

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

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Channel> {
    return await this.channelService.findById(id);
  }

  @Put('/:id')
  async update(
    @Body() channel: Channel,
    @Param('id') id: number,
  ): Promise<UpdateResult> {
    return await this.channelService.update(channel, id);
  }

  @Delete('/:id')
  async deleteChannel(@Param('id') id: number): Promise<DeleteResult> {
    return await this.channelService.deleteChannel(id);
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

  @Put(
    '/:channelId/config/',
  ) /**Edition de la configuration d'un channel par l'identifiant */
  async editConfig(
    @Param('channelId') channelId: number,
    @Body() config: Config,
  ) {
    try {
      return await this.channelService.editConfig(channelId, config);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('/all/private')
  async getChannelsWithConfigPrivate(): Promise<Channel[]> {
    console.log('getChannelsWithConfigPrivate');
    return await this.channelService.getChannelsWithConfigPrivate();
  }

  @Post('/private')
  async createPrivateChannel(): Promise<Channel> {
    return await this.channelService.createPrivateChannel();
  }
}
