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
interface Notification {
    type: 'success' | 'error';
    message: string;
}

function AddStudentsPage() {
    const [students, setStudents] = useState<Student[]>([{ id: 1, lastName: '', firstName: '', email: '' }]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [magicLinks, setMagicLinks] = useState<{ email: string; link: string }[]>([]);
   
    const addStudent = () => setStudents(prev => [...prev, { id: Date.now(), lastName: '', firstName: '', email: '' }]);
   
    const removeStudent = (id: number) => setStudents(prev => prev.filter(student => student.id !== id));
   
    const updateStudent = (id: number, updatedStudent: Student) =>
        setStudents(prev => prev.map(student => (student.id === id ? updatedStudent : student)));
   
    const addNotification = (type: 'success' | 'error', message: string) => {
        setNotifications(prev => [...prev, { type, message }]);
        setTimeout(() => setNotifications(prev => prev.slice(1)), 4000);
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setNotifications([]);
        setMagicLinks([]);

        try {
            const studentsToInvite: StudentInvite[] = students
                .filter(student => student.email.trim() && student.lastName.trim() && student.firstName.trim())
                .map(student => ({
                    name: student.lastName,
                    firstName: student.firstName,
                    email: student.email
                }));

            if (studentsToInvite.length === 0) {
                addNotification('error', 'Veuillez ajouter au moins un étudiant avec un email valide.');
                return;
            }

            const result = await inviteStudents(studentsToInvite);
                if (result.invitations && result.invitations.length > 0) {
                    addNotification('success', 'Invitations envoyées avec succès');
                    setStudents([{ id: Date.now(), lastName: '', firstName: '', email: '' }]);
                    setMagicLinks(result.invitations.map((invitation: { email: string; magicLink: string }) => ({
                        email: invitation.email,
                        link: invitation.magicLink
                    })));
                } else {
                    addNotification('error', 'Aucune invitation n\'a été envoyée. Veuillez réessayer.');
                }
        } catch (err) {
            if (err instanceof Error && err.message.includes('email est déjà utilisé')) {
                addNotification('error', `Erreur : ${err.message}`);
            } else {
                addNotification('error', 'Erreur lors de l\'envoi des invitations. Veuillez réessayer.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                    <button className='add-student-button' type="button" onClick={addStudent} disabled={isLoading}>
                        Ajouter un étudiant
                    </button>
                    <button className='submit-button' type="submit" disabled={isLoading}>
                        {isLoading ? 'Envoi en cours...' : 'Envoyer les invitations'}
                    </button>
                </div>
            </form>

            {notifications.length > 0 && (
                <div className="notifications">
                    {notifications.map((notif, index) => (
                        <div key={index} className={`notification ${notif.type}`}>
                            {notif.message}
                        </div>
                    ))}
                </div>
            )}

            {magicLinks.length > 0 && (
                <div className="magic-links">
                    <h2>Lien d'invitation :</h2>
                    <ul>
                        {magicLinks.map((link, index) => (
                            <li key={index}>
                                <strong>{link.email}</strong>: <a href={link.link}>{link.link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AddStudentsPage;
