import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { StudentService } from './student.service';

@Injectable()
export class PresenceSimulatorService implements OnModuleInit, OnModuleDestroy {
  private intervalId: NodeJS.Timeout | null = null;
  private presenceUpdateCallback: (updatedStudent: any) => void = () => {};

  constructor(private readonly studentService: StudentService) {}

  onModuleInit() {
    console.log('PresenceSimulatorService: Initializing');
    this.startSimulation();
  }

  onModuleDestroy() {
    console.log('PresenceSimulatorService: Destroying');
    this.stopSimulation();
  }

  startSimulation(intervalMs: number = 30000) {
    console.log(
      `PresenceSimulatorService: Starting simulation with interval ${intervalMs}ms`,
    );
    if (this.intervalId !== null) {
      this.stopSimulation();
    }

    this.intervalId = setInterval(() => {
      const students = this.studentService.getAllStudents();
      console.log(
        `PresenceSimulatorService: Total students: ${students.length}`,
      );

      const randomStudent =
        students[Math.floor(Math.random() * students.length)];
      const newStatus = !randomStudent.onLine;

      console.log(
        `PresenceSimulatorService: Updating student ${randomStudent.id} status to ${newStatus ? 'online' : 'offline'}`,
      );

      this.studentService.updateStudentStatus(randomStudent.id, newStatus);

      const updatedStudent = {
        id: randomStudent.id,
        name: randomStudent.name,
        firstName: randomStudent.firstName,
        status: newStatus ? 'online' : 'offline',
      };

      console.log(
        'PresenceSimulatorService: Simulated presence update:',
        updatedStudent,
      );
      this.presenceUpdateCallback(updatedStudent);
    }, intervalMs);
  }

  stopSimulation() {
    console.log('PresenceSimulatorService: Stopping simulation');
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  onPresenceUpdate(callback: (updatedStudent: any) => void) {
    console.log('PresenceSimulatorService: Setting presence update callback');
    this.presenceUpdateCallback = callback;
  }
}
