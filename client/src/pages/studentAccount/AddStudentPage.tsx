import React, { useState } from 'react';
import StudentForm from './StudentForm';
import './addStudent.css';

export interface Student {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
}

const AddStudentsPage  = () => {
  const [students, setStudents] = useState<Student[]>([{ id: 1, lastName: '', firstName: '', email: '' }]);

  const addStudent = () => {
    setStudents([...students, { id: Date.now(), lastName: '', firstName: '', email: '' }]);
  };

  const removeStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const updateStudent = (id: number, updatedStudent: Student) => {
    setStudents(students.map(student =>student.id !== null && student.id === id ? updatedStudent : student));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Étudiants à ajouter:', students);
  };

  return (
    <>
    <div className="add-students-page">
      <h1>Ajouter des étudiants</h1>
      <form onSubmit={handleSubmit}>
        {students.map((student) => (
          <StudentForm
            key={student.id}
            student={student}
            onUpdate={(updatedStudent) => updateStudent(student.id, updatedStudent)}
            onRemove={() => removeStudent(student.id)}
          />
        ))}
        <div className='AddStudentBTN'>
        <button className='add-student-button' type="button" onClick={addStudent}>Ajouter un étudiant</button>
        <button className='submit-button ' type="submit">Envoyer les invitations</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddStudentsPage;