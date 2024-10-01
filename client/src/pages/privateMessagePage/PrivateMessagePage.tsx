import { useEffect, useState } from 'react';
import './PrivateMessagePage.css';

import { fetchGetUser } from '../../services/user/fetch/FetchGetUser';
import { useNavigation } from '../../context/NavigationContext';
import { fetchPrivateChannel } from '../../services/channel/fetch/FetchPrivateChannel';
import { useAuth } from '../../context/AuthentificationContext';



function PrivateMessagePage() {
  const [students, setStudents] = useState([]);
  const { setActiveContentMainComp, currentSection, setCurrentSection } =
    useNavigation();
   const { user} = useAuth();
  const userId = user?.id;

  console.log(userId, "userId contexte")
  
  const studentsList = students.filter(user => user.id !== userId);

  console.log(studentsList, "students");

  

  useEffect(() => {
    try {
      fetchGetUser().then((data) => {
        console.log(data);
        setStudents(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleClick(targetUser) {
    setActiveContentMainComp(true);
   

    try {
      fetchPrivateChannel(userId, targetUser).then((data) => {
        console.log(data.uuid, 'uuid');
        setCurrentSection((prevState) => ({
          ...prevState,
          uuid: data.uuid,
        }));
      });
    } catch (error) {}
  }
  return (
    <div className='privateMessagePage-container'>
      <h1>Messages privés</h1>
      <div className='list-student-wrapper'>
        {studentsList.map((student, i) => (
          <div className='student-wrapper' key={i}>
            <p>{student.name}</p>
            <button type='submit' onClick={() => handleClick(student.id)}>
              Envoyer un message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrivateMessagePage;
