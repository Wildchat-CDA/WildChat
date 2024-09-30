import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export interface Student {
    id: string;
    name: string;
    firstName: string;
    email: string;
    password: string;
    onLine: boolean
  }

@Injectable()
export class StudentService {
  [x: string]: any;
  private students: Student[] = [];

  constructor() {
    this.generateMockStudents();
  }

  private generateMockStudents(): void {
    const mockStudents: Student[] = [
      { id: uuidv4(), name: 'Dubois', firstName: 'Marie', email: 'marie.dubois@email.com', password: 'Password@123', onLine: true },
      { id: uuidv4(), name: 'Martin', firstName: 'Thomas', email: 'thomas.martin@email.com', password: 'password@456', onLine: true },
      { id: uuidv4(), name: 'Leroy', firstName: 'Emma', email: 'emma.leroy@email.com', password: 'Password@789', onLine: false},
      { id: uuidv4(), name: 'Moreau', firstName: 'Lucas', email: 'lucas.moreau@email.com', password: 'Password@ab54', onLine: true },
      { id: uuidv4(), name: 'Petit', firstName: 'Chloé', email: 'chloe.petit@email.com', password: 'Password@8f', onLine: true},
      { id: uuidv4(), name: 'Roux', firstName: 'Hugo', email: 'hugo.roux@email.com', password: 'Password@231', onLine: true },
      { id: uuidv4(), name: 'Fournier', firstName: 'Léa', email: 'lea.fournier@email.com', password: 'Password@76k', onLine: false },
      { id: uuidv4(), name: 'Girard', firstName: 'Nathan', email: 'nathan.girard@email.com', password: 'Password@09', onLine: false },
      { id: uuidv4(), name: 'Morel', firstName: 'Camille', email: 'camille.morel@email.com', password: 'Password@67' , onLine: true},
      { id: uuidv4(), name: 'Lambert', firstName: 'Lea', email: 'theo.lambert@email.com', password: 'Password@87', onLine: false },
    ];

    this.students = mockStudents;
  }

  getAllStudents(): Student[] {
    return this.students;
  }

  getStudentById(id: string): Student | undefined {
    return this.students.find(student => student.id === id);
  }
}