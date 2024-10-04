import { Controller, Get, Param } from '@nestjs/common';
import { StudentService, Student } from '../service/student.service';
import { PresenceService, PresenceData } from '../service/presence.service';

@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly presenceService: PresenceService,
  ) {}

  @Get()
  getAllStudents(): Student[] {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  getStudentById(@Param('id') id: string): Student | undefined {
    return this.studentService.getStudentById(id);
  }

  @Get('presence')
  async getAllStudentsWithPresence(): Promise<PresenceData[]> {
    return this.presenceService.getAllUsersPresence();
  }
}
