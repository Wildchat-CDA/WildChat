import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/entity/channel.entity';
import { Config } from 'src/entity/config.entity';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {}

  async create(channel: {
    title: string;
    // type: number;

    slot: number;
  }): Promise<Channel> {
    const newChannel = new Channel();
    newChannel.uuid = uuidv4();
    newChannel.title = channel.title;

    // newChannel.type = channel.type;

    newChannel.slot = channel.slot;

    return await this.channelRepository.save(newChannel);
  }

  async findAll(): Promise<Channel[]> {
    return this.channelRepository.find({
      relations: ['config', 'sections'],
    });
  }

  async findById(id: number): Promise<Channel> {
    return await this.channelRepository.findOneBy({ id: id });
  }

  async update(newChannel: Channel, id: number): Promise<UpdateResult> {
    const channel = await this.channelRepository.findOneBy({ id: id });

    if (!channel) throw new NotFoundException(Error);

    const updatedChannel = await this.channelRepository.update(id, newChannel);

    return updatedChannel;
  }

  async deleteChannel(id: number): Promise<DeleteResult> {
    const channel = await this.channelRepository.findOneBy({ id: id });

    if (!channel) {
      throw new NotFoundException('Channel not found');
    }

    return await this.channelRepository.delete(id);
  }

  async addConfig(channelId: number, configId: number) {
    const channel = await this.channelRepository.findOneBy({ id: channelId });
    const config = await this.configRepository.findOneBy({ id: configId });

    channel.config = config;

    return await this.channelRepository.save(channel);
  }

  async editConfig(channelId: number, config: Config) {
    const channel = await this.channelRepository.findOneBy({ id: channelId });

    if (!channel) throw new NotFoundException(Error);

    const newConfig = this.configRepository.create(config);

    await this.configRepository.save(newConfig);

    channel.config = newConfig;

    return await this.channelRepository.save(channel);
  }
}
