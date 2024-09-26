import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/entity/channel.entity';
import { Config } from 'src/entity/config.entity';
import { Type } from 'src/entity/type.entity';
import { User } from 'src/entity/user.entity';

import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async createPrivateChannel(
    userId: number,
    userTarget: number,
  ): Promise<Channel> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['channels', 'channels.config.type'],
    });

    const user2 = await this.userRepository.findOne({
      where: { id: userTarget },
      relations: ['channels', 'channels.config.type'],
    });

    const channelsUser1 = user.channels;
    const channelsUser2 = user2.channels;

    const commonChannels = [];
    for (const channel1 of channelsUser1) {
      for (const channel2 of channelsUser2) {
        if (channel1.id === channel2.id) {
          commonChannels.push(channel1);
          break;
        }
      }
    }

    if (commonChannels.length > 0) {
      return commonChannels[0];
    } else {
      const newPrivateChannel = this.channelRepository.create({
        uuid: uuidv4(),
        title: 'channel Private',
        slot: 2,
      });
      const newConfig = this.configRepository.create({
        maxSlot: 2,
        type: await this.typeRepository.findOne({
          where: { name: 'private' },
        }),
      });
      newPrivateChannel.config = newConfig;

      await this.configRepository.save(newConfig);
      const savedNewPrivateChannel =
        await this.channelRepository.save(newPrivateChannel);

      user.channels.push(newPrivateChannel);
      user2.channels.push(newPrivateChannel);

      await this.userRepository.save(user);
      await this.userRepository.save(user2);

      return savedNewPrivateChannel;
    }

    // // Créer un nouveau canal privé
  }

  // async createPrivateChannel(): Promise<Channel> {
  //   const newPrivateChannel = this.channelRepository.create({
  //     uuid: uuidv4(),
  //     title: 'channel Private',
  //     slot: 2,
  //   });

  //   const newConfig = this.configRepository.create({
  //     maxSlot: 2,
  //     // type: await this.typeRepository.findOneBy({ id: 1 }),
  //     type: await this.typeRepository.findOne({
  //       where: { name: 'private' },
  //     }),
  //   });

  //   newPrivateChannel.config = newConfig;

  //   await this.configRepository.save(newConfig);
  //   const savedNewPrivateChannel =
  //     await this.channelRepository.save(newPrivateChannel);

  //   return savedNewPrivateChannel;
  // }

  //ANCIENNE VERSION DE GETCHANNELCONFIGPRIVATE
  // async getChannelsWithConfigPrivate(): Promise<Channel[]> {
  //   const channels = await this.channelRepository.find({
  //     relations: ['config', 'config.type'],
  //     where: {
  //       config: {
  //         type: {
  //           name: 'private',
  //         },
  //       },
  //     },
  //   });

  //   console.log(channels, 'channels');

  //   return channels;
  // }

  async getChannelsWithConfigPrivate(userId: number): Promise<Channel[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['channels', 'channels.config.type'],
    });

    console.log(user);

    if (!user) throw new Error('User not found');

    const channels = user.channels.filter(
      (channel) => channel.config.type.name === 'private',
    );

    if (channels.length === 0) throw new Error('User has no private channels');

    return channels;
  }
}
