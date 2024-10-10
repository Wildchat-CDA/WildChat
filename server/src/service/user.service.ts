import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/entity/channel.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  getUserById(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['channels', 'channels.config.type'],
    });
  }

  async getUserChannels(userId: number): Promise<Channel[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['channels', 'channels.config.type'],
    });

    if (!user) throw new Error('User not found');

    const channels = user.channels.filter(
      (channel) => channel.config.type.name === 'public',
    );

    if (channels.length === 0) throw new Error('User has no private channels');

    return channels;
  }

  async getStudentById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
