import { useEffect, useState } from 'react';
import './PrivateMessagePage.css';
import { fetchGetSection } from '../../services/section/fetch/FetchGetSection';
import { fetchGetUser } from '../../services/section/fetch/FetchGetUser';

function PrivateMessagePage() {
  const [student, setStudent] = useState('');
  const name = 'Patricia';

  useEffect(() => {
    try {
      fetchGetUser().then((data) => {
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleClick(name) {
    console.log('je clique sur', name);
  }
  return (
    <div className='privateMessagePage-container'>
      <h1>Messages privés</h1>
      <div className='list-student-wrapper'>
        <div className='student-wrapper'>
          <p>{name}</p>
          <button type='submit' onClick={() => handleClick(name)}>
            Envoyer un message
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivateMessagePage;
