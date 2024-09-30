import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import './PresenceList.css';

interface User {
  id: number;
  status: 'online' | 'offline';
  onLine: boolean;
  name: string;
  firstName: string;
}

const PresenceList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [ofLine, setOfLine] = useState<User[]>([]);
  const [onLine, setOnLine] = useState<User[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');  //todo recuperer socket service
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('presenceUpdate', (updatedUser: User) => {
        setUsers((prevUsers) => {
          const userIndex = prevUsers.findIndex((u) => u.id === updatedUser.id);
          if (userIndex !== -1) {
            const newUsers = [...prevUsers];
            newUsers[userIndex] = updatedUser;
            return newUsers;
          }
          return [...prevUsers, updatedUser];
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    fetch('http://localhost:3000/students/')
      .then((response) => response.json())
      .then((data: User[]) => {
        setOnLine(data.filter(user => user.onLine));
        setOfLine(data.filter(user => !user.onLine));
      });
  }, []);

  return (
    <div className="presence-list">
      <h1>Liste des présences</h1>

      <details>
        <summary>Non connectés({ofLine.length})</summary>
        <ul className='studentOfLine'>
        <br />
          {ofLine.map((user) => (
            <li key={user.id}>
              {user.name} {user.firstName}
            </li>
          ))}
        </ul>
      </details>
          <br />
      <details>
        <summary>Connectés ({onLine.length})</summary>
        <br />
        <ul className='studentonLine'>
          {onLine.map((user) => (
            <li key={user.id}>
              {user.name} {user.firstName}
            </li>
          ))}
        </ul>
      </details>    

    </div>
  );
};
export default PresenceList;
