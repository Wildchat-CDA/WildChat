import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/entity/channel.entity';
import { Config } from 'src/entity/config.entity';
import { Type } from 'src/entity/type.entity';

import {
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
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
      relations: ['config', 'sections', 'config.type'],
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

  async createPrivateChannel(): Promise<Channel> {
    const newPrivateChannel = this.channelRepository.create({
      uuid: uuidv4(),
      title: 'channel Private',
      slot: 2,
    });

    const newConfig = this.configRepository.create({
      maxSlot: 2,
      type: await this.typeRepository.findOneBy({ id: 1 }),
    });

    newPrivateChannel.config = newConfig;

    await this.configRepository.save(newConfig);
    const savedNewPrivateChannel =
      await this.channelRepository.save(newPrivateChannel);

    return savedNewPrivateChannel;
  }

  async getChannelsWithConfigPrivate(): Promise<Channel[]> {
    const channels = await this.channelRepository.find({
      relations: ['config', 'config.type'],
      where: {
        config: {
          type: {
            id: 1,
          },
        },
      },
    });

    console.log(channels, 'channels');

    return channels;
  }
}
