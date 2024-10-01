import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { StudentService } from './student.service';

@Injectable()
export class PresenceSimulatorService implements OnModuleInit, OnModuleDestroy {
  private intervalId: NodeJS.Timeout | null = null;
  private presenceUpdateCallback: (updatedStudent: any) => void = () => {};

  constructor(private readonly studentService: StudentService) {}

  onModuleInit() {
    this.startSimulation();
  }

  onModuleDestroy() {
    this.stopSimulation();
  }

  startSimulation(intervalMs: number = 30000) {
    if (this.intervalId !== null) {
      this.stopSimulation();
    }

    this.intervalId = setInterval(() => {
      const students = this.studentService.getAllStudents();

      const randomStudent =
        students[Math.floor(Math.random() * students.length)];
      const newStatus = !randomStudent.onLine;

      this.studentService.updateStudentStatus(randomStudent.id, newStatus);

      const updatedStudent = {
        id: randomStudent.id,
        name: randomStudent.name,
        firstName: randomStudent.firstName,
        status: newStatus ? 'online' : 'offline',
      };
      
      this.presenceUpdateCallback(updatedStudent);
    }, intervalMs);
  }

  stopSimulation() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  onPresenceUpdate(callback: (updatedStudent: any) => void) {
    this.presenceUpdateCallback = callback;
  }
}
