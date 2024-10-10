import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from '../service/student.service';
import { PresenceService, PresenceData } from '../service/presence.service';
import { User } from '../entity/user.entity';

@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly presenceService: PresenceService,
  ) {}

  @Get()
  async getAllStudents(): Promise<User[]> {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string): Promise<User | undefined> {
    return this.studentService.getStudentById(Number(id));
  }

  @Get('presence')
  async getAllStudentsWithPresence(): Promise<PresenceData[]> {
    return this.presenceService.getAllUsersPresence();
  }
}
