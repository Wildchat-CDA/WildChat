import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/entity/channel.entity';

import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  async create(channel: {
    title: string;
    type: number;
    slot: number;
  }): Promise<Channel> {
    const newChannel = new Channel();
    newChannel.uuid = uuidv4();
    newChannel.title = channel.title;
    newChannel.type = channel.type;
    newChannel.slot = channel.slot;

    return await this.channelRepository.save(newChannel);
  }

  async findAll(): Promise<Channel[]> {
    return this.channelRepository.find();
  }
}
