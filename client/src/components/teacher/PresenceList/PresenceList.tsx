// import { useState, useEffect } from 'react';
// import webSocketService from '../../../services/webSocketService';
// import './PresenceList.css';

// interface User {
//   id: number;
//   status: 'online' | 'offline';
//   onLine: boolean;
//   name: string;
//   firstName: string;
// }

// function PresenceList() {
//     const [users, setUsers] = useState<User[]>([]);
//     const [ofLine, setOfLine] = useState<User[]>([]);
//     const [onLine, setOnLine] = useState<User[]>([]);
  
//     useEffect(() => {
//       webSocketService.on('presenceUpdate', (updatedUser: User) => {
//         setUsers((prevUsers) => {
//           const userIndex = prevUsers.findIndex((u) => u.id === updatedUser.id);
//           if (userIndex !== -1) {
//             const newUsers = [...prevUsers];
//             newUsers[userIndex] = updatedUser;
//             return newUsers;
//           }
//           return [...prevUsers, updatedUser];
//         });
//       });
  
//       fetch(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/students/`)
//         .then((response) => response.json())
//         .then((data: User[]) => {
//           setUsers(data);
//           setOnLine(data.filter(user => user.onLine));
//           setOfLine(data.filter(user => !user.onLine));
//         });
  
//       return () => {
//         webSocketService.off('presenceUpdate', () => {});
//       };
//     }, []);
  
//     useEffect(() => {
//       setOnLine(users.filter(user => user.onLine));
//       setOfLine(users.filter(user => !user.onLine));
//     }, [users]);
  
//     return (
//       <div className="presence-list">
//         <h1>Liste des présences</h1>
//         <details>
//           <summary>Non connectés({ofLine.length})</summary>
//           <ul className='studentOfLine'>
//           <br />
//             {ofLine.map((user) => (
//               <li key={user.id}>
//                 {user.name} {user.firstName}
//               </li>
//             ))}
//           </ul>
//         </details>
//         <br />
//         <details>
//           <summary>Connectés ({onLine.length})</summary>
//           <br />
//   <ul className='studentonLine'>
//             {onLine.map((user) => (
//               <li key={user.id}>
//                 {user.name} {user.firstName}
//               </li>
//             ))}
//           </ul>
//         </details>
//       </div>
//     );
//   }
  
//   export default PresenceList; 


import { useState, useEffect } from 'react';
import './PresenceList.css';

interface User {
  id: number;
  status: 'online' | 'offline';
  onLine: boolean;
  name: string;
  firstName: string;
}

const fakeSocketService = {
  listeners: {} as { [key: string]: ((data: any) => void)[] },
  on(event: string, callback: (data: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  },
  off(event: string) {
    delete this.listeners[event];
  },
  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
};

function PresenceList() {
  const [users, setUsers] = useState<User[]>([]);
  const [ofLine, setOfLine] = useState<User[]>([]);
  const [onLine, setOnLine] = useState<User[]>([]);

  useEffect(() => {
    fakeSocketService.on('presenceUpdate', (updatedUser: User) => {
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

   
    const mockUsers: User[] = [
      { id: 1, status: 'online', onLine: true, name: 'Doe', firstName: 'John' },
      { id: 2, status: 'offline', onLine: false, name: 'Smith', firstName: 'Jane' },
      { id: 3, status: 'online', onLine: true, name: 'Brown', firstName: 'Bob' },
      { id: 4, status: 'offline', onLine: false, name: 'Wilson', firstName: 'Alice' },
      { id: 5, status: 'online', onLine: true, name: 'Taylor', firstName: 'Tom' },
    ];

    setUsers(mockUsers);
    setOnLine(mockUsers.filter(user => user.onLine));
    setOfLine(mockUsers.filter(user => !user.onLine));

   
    const intervalId = setInterval(() => {
      simulatePresenceChange();
    }, 10000);

    return () => {
      fakeSocketService.off('presenceUpdate');
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setOnLine(users.filter(user => user.onLine));
    setOfLine(users.filter(user => !user.onLine));
  }, [users]);

  const simulatePresenceChange = () => {
    if (users.length > 0) {
      const randomIndex = Math.floor(Math.random() * users.length);
      const updatedUser = { ...users[randomIndex] };
      updatedUser.onLine = !updatedUser.onLine;
      updatedUser.status = updatedUser.onLine ? 'online' : 'offline';
      fakeSocketService.emit('presenceUpdate', updatedUser);
    }
  };

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
}

export default PresenceList;