import React, { useState } from 'react';
import StudentForm from './StudentForm';
import { inviteStudents, StudentInvite } from '../../services/auth/studentService';
import './addStudent.css';

export interface Student {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
}

function AddStudentsPage() {
    const [students, setStudents] = useState<Student[]>([{ id: 1, lastName: '', firstName: '', email: '' }]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    function addStudent() {
        setStudents(prevStudents => [...prevStudents, { id: Date.now(), lastName: '', firstName: '', email: '' }]);
    }

    function removeStudent(id: number) {
        setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
    }

    function updateStudent(id: number, updatedStudent: Student) {
        setStudents(prevStudents => prevStudents.map(student => student.id === id ? updatedStudent : student));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            
            const studentsToInvite: StudentInvite[] = students
                .filter(student => student.email.trim() !== '')
                .map(student => ({
                    name: student.lastName,
                    firstName: student.firstName,
                    email: student.email
                }));
            
            if (studentsToInvite.length === 0) {
                setError('Veuillez ajouter au moins un étudiant.');
                return;
            }

            const result = await inviteStudents(studentsToInvite);
            console.log('Invitations envoyées:', result);
        } catch (err: unknown) {
            setError('Erreur lors de l\'envoi des invitations. Veuillez réessayer.');
            if (err instanceof Error) {
                console.error('Erreur:', err.message);
            } else {
                console.error('Une erreur inconnue est survenue');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="add-students-page">
            <h1>Ajouter des étudiants</h1>
            {error && <div className="error-message">{error}</div>}
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
                    <button className='add-student-button' type="button" onClick={addStudent}>
                        Ajouter un étudiant
                    </button>
                    <button className='submit-button' type="submit" disabled={isLoading}>
                        {isLoading ? 'Envoi en cours...' : 'Envoyer les invitations'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddStudentsPage;

