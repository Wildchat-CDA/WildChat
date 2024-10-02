import React from 'react';
import { Student } from './AddStudentPage';
import "./addStudent.css"

interface StudentFormProps {
  student: Student;
  onUpdate: (updatedStudent: Student) => void;
  onRemove: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onUpdate, onRemove }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ ...student, [name]: value });
  };

  return (
    <>
    <div className="student-form">
      <input
        type="text"
        name="lastName"
        value={student.lastName}
        onChange={handleChange}
        placeholder="   Nom"
      />
      <input
        type="text"
        aria-label='Prénom'
        name="firstName"
        value={student.firstName}
        onChange={handleChange}
        placeholder="   Prénom"
      />
      <input
        type="email"
        name="email"
        value={student.email}
        onChange={handleChange}
        placeholder="    Email"
      />
      <div className='removeStudent-form'>
       <button type="button" onClick={onRemove}>Supprimer</button>
      </div>
    </div>
    </>
  );
};

export default StudentForm;