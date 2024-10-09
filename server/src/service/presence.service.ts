import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';

export interface PresenceData {
  user: User;
  status: 'online' | 'offline';
}

@Injectable()
export class PresenceService {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
  ) {}

  async setUserPresence(
    userId: number,
    status: 'online' | 'offline',
  ): Promise<void> {
    await this.redisService.setUserPresence(userId.toString(), status);
  }

  async getAllUsersPresence(): Promise<PresenceData[]> {
    const users = await this.userService.findAll();
    const allPresences = await this.redisService.getAllUserPresences();

    return users.map((user) => ({
      user,
      status: (allPresences[user.id.toString()] || 'offline') as
        | 'online'
        | 'offline',
    }));
  }
}
