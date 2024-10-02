import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';
import { StudentService, Student } from './student.service';

export interface PresenceData {
  student: Student;
  status: 'online' | 'offline';
}

@Injectable()
export class PresenceService {
  constructor(
    private readonly redisService: RedisService,
    private readonly studentService: StudentService,
  ) {}

  public async setUserPresence(userId: string, status: 'online' | 'offline'): Promise<void> {
    await this.redisService.setUserPresence(userId, status);
  }

  public async getAllUsersPresence(): Promise<PresenceData[]> {
    const students: Student[] = this.studentService.getAllStudents();
    const allPresences = await this.redisService.getAllUserPresences();

    return students.map((student) => ({
      student,
      status: (allPresences[student.id] || 'offline') as 'online' | 'offline',
    }));
  }
}