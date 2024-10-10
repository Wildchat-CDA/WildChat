import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';
import { StudentService } from './student.service';
import { User } from '../entity/user.entity';

export interface PresenceData {
  user: User;
  status: 'online' | 'offline';
}

@Injectable()
export class PresenceService {
  constructor(
    private readonly redisService: RedisService,
    private readonly studentService: StudentService,
  ) {}

  public async setUserPresence(
    userId: number,
    status: 'online' | 'offline',
  ): Promise<void> {
    await this.redisService.setUserPresence(userId.toString(), status);
  }

  public async getAllUsersPresence(): Promise<PresenceData[]> {
    const users = await this.studentService.getAllStudents();
    const allPresences = await this.redisService.getAllUserPresences();

    return users.map((user) => ({
      user,
      status: (allPresences[user.id.toString()] || 'offline') as
        | 'online'
        | 'offline',
    }));
  }

  public async getUserPresence(userId: number): Promise<'online' | 'offline'> {
    return (await this.redisService.getUserPresence(userId.toString())) as
      | 'online'
      | 'offline';
  }

  public async updatePresence(
    userId: number,
    status: 'online' | 'offline',
  ): Promise<void> {
    await this.setUserPresence(userId, status);
  }
}
