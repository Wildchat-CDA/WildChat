import { useEffect, useState } from 'react';
import './PrivateMessagePage.css';
import { fetchGetUser } from '../../services/user/fetch/FetchGetUser';
import { useNavigation } from '../../context/NavigationContext';
import { fetchPrivateChannel } from '../../services/channel/fetch/FetchPrivateChannel';
import Cookies from 'js-cookie';
import { useScrollToBottom } from '../../services/useScrollBottom';

interface Student {
  id: number;
  name: string;
}

function PrivateMessagePage() {
  const [students, setStudents] = useState([]);
  const { setActiveContentMainComp, currentSection, setCurrentSection } =
    useNavigation();

  const cookie = JSON.parse(Cookies.get('token') as string);
  const userId: number = parseInt(cookie.userInfo.id, 10);

  console.log(userId, 'id dans privateMessage');

  const studentsList = students.filter((user: Student) => user.id !== userId);

   const scrollRef = useScrollToBottom(students);

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

  function handleClick(targetUser: number) {
    console.log('je passe dans handleClick');
    setActiveContentMainComp(true);

    try {
      fetchPrivateChannel(userId, targetUser).then((data) => {
        console.log(userId, 'userId dans fetchPrivateChannel');
        console.log(targetUser, 'targetUser dans fetchPrivateChannel');
        console.log(data.uuid, 'uuid');
        setCurrentSection((prevState) => ({
          ...prevState,
          uuid: data.uuid,
          sectionTitle: data.sectionTitle,
          channelTitle: data.channelTitle
          
        }));
        console.log(
          currentSection,
          'le uuid mis dans currentSection quand le fetch est fait'
        );
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='privateMessagePage-container'>
      <h1>Messages privés</h1>
      <div className='list-student-wrapper'>
        {studentsList.map((student: Student, i: number) => (
          <div className='student-wrapper' key={i}>
            <p>{student.name}</p>
            <button type='submit' onClick={() => handleClick(student.id)}>
              Envoyer un message
            </button>
          </div>
        ))}
      </div>
      <div ref={scrollRef}></div>
    </div>
  );
}

export default PrivateMessagePage;
