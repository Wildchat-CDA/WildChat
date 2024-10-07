import React from 'react';
import { Student } from './AddStudentPage';
import '../../../pages/studentAccount/addStudent.css';

interface StudentFormProps {
  student: Student;
  onUpdate: (updatedStudent: Student) => void;
  onRemove: () => void;
}
function StudentForm({ student, onUpdate, onRemove }: StudentFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ ...student, [name]: value });
  };

  return (
    <div className="student-form">
      <div className="form-field">
        <label htmlFor={`lastName-${student.id}`}>Nom</label>
        <input
          id={`lastName-${student.id}`}
          type="text"
          name="lastName"
          value={student.lastName}
          onChange={handleChange}
          placeholder="Nom"
        />
      </div>
      <div className="form-field">
        <label htmlFor={`firstName-${student.id}`}>Prénom</label>
        <input
          id={`firstName-${student.id}`}
          type="text"
          name="firstName"
          value={student.firstName}
          onChange={handleChange}
          placeholder="Prénom"
        />
      </div>
      <div className="form-field">
        <label htmlFor={`email-${student.id}`}>Email</label>
        <input
          id={`email-${student.id}`}
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>
      <div className='removeStudent-form'>
        <button type="button" onClick={onRemove}>Supprimer</button>
      </div>
    </div>
  );
}

export default StudentForm;
