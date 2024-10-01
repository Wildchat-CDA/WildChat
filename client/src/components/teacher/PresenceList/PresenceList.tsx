<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { webSocketService } from '../../../services/webSocketService';
=======
import { useState, useEffect } from 'react';
import webSocketService from '../../../services/webSocketService';
>>>>>>> c14778c1838949fb784f3d0c0f7bd1b4369ec968
import './PresenceList.css';

interface User {
  id: string;
  name: string;
  firstName: string;
  status: 'online' | 'offline';
}

<<<<<<< HEAD
const usePresence = (): User[] => {
  const [users, setUsers] = useState<User[]>([]);

  const handlePresenceUpdate = useCallback((updatedUser: User) => {
    console.log('PresenceList: Handling presence update:', updatedUser);
    setUsers(prevUsers => {
      const userIndex = prevUsers.findIndex(user => user.id === updatedUser.id);
      if (userIndex !== -1) {
        const newUsers = [...prevUsers];
        newUsers[userIndex] = {...newUsers[userIndex], ...updatedUser};
        return newUsers;
      } else {
        return [...prevUsers, updatedUser];
      }
    });
  }, []);

  useEffect(() => {
    console.log('PresenceList: Connecting to WebSocket');
    webSocketService.connect();

    const handleConnect = () => {
      console.log('PresenceList: WebSocket connected, requesting initial presence');
      webSocketService.emit('getPresence');
    };

    const handleDisconnect = () => {
      console.log('PresenceList: WebSocket disconnected');
    };

    const handleInitialPresence = (initialUsers: User[]) => {
      console.log('PresenceList: Initial users received:', initialUsers);
      setUsers(initialUsers);
    };

    const handlePresenceUpdateEvent = (updatedUser: User) => {
      console.log('PresenceList: Presence update received:', updatedUser);
      handlePresenceUpdate(updatedUser);
    };

    webSocketService.on('connect', handleConnect);
    webSocketService.on('disconnect', handleDisconnect);
    webSocketService.on('initialPresence', handleInitialPresence);
    webSocketService.on('presenceUpdate', handlePresenceUpdateEvent);

    if (webSocketService.isSocketConnected()) {
      webSocketService.emit('getPresence');
    }

    return () => {
      console.log('PresenceList: Cleaning up WebSocket listeners');
      webSocketService.off('connect', handleConnect);
      webSocketService.off('disconnect', handleDisconnect);
      webSocketService.off('initialPresence', handleInitialPresence);
      webSocketService.off('presenceUpdate', handlePresenceUpdateEvent);
    };
  }, [handlePresenceUpdate]);

  return users;
};

const PresenceList: React.FC = () => {
  const users = usePresence();

  console.log('PresenceList: Rendering with users:', users);

  const onlineUsers = users.filter(user => user.status === 'online');
  const offlineUsers = users.filter(user => user.status === 'offline');

  const renderUserList = (userList: User[], className: string) => (
    <ul className={className}>
      {userList.map(user => (
        <li key={`${user.id}-${user.status}`}>{user.name} {user.firstName}</li>
      ))}
    </ul>
  );

  return (
    <div className="presence-list">
      <h1>Liste des présences</h1>
      <details>
        <summary>Non connectés ({offlineUsers.length})</summary>
        {renderUserList(offlineUsers, "studentOffline")}
      </details>
      <details>
        <summary>Connectés ({onlineUsers.length})</summary>
        {renderUserList(onlineUsers, "studentOnline")}
      </details>
    </div>
  );
};
=======
function PresenceList() {
    const [users, setUsers] = useState<User[]>([]);
    const [ofLine, setOfLine] = useState<User[]>([]);
    const [onLine, setOnLine] = useState<User[]>([]);
  
    useEffect(() => {
      webSocketService.on('presenceUpdate', (updatedUser: User) => {
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
  
      fetch(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/students/`)
        .then((response) => response.json())
        .then((data: User[]) => {
          setUsers(data);
          setOnLine(data.filter(user => user.onLine));
          setOfLine(data.filter(user => !user.onLine));
        });
  
      return () => {
        webSocketService.off('presenceUpdate', () => {});
      };
    }, []);
  
    useEffect(() => {
      setOnLine(users.filter(user => user.onLine));
      setOfLine(users.filter(user => !user.onLine));
    }, [users]);
  
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





// import { useState, useEffect } from 'react';
// import './PresenceList.css';
// import webSocketService from '../../../services/webSocketService';
// import { PresenceSimulator } from '../../../services/Presence/PresenceSimulator';

// interface User {
//   id: number;
//   status: 'online' | 'offline';
//   onLine: boolean;
//   name: string;
//   firstName: string;
// }

// const fakeSocketService = {
//   listeners: {} as { [key: string]: ((data: any) => void)[] },
//   on(event: string, callback: (data: any) => void) {
//     if (!this.listeners[event]) {
//       this.listeners[event] = [];
//     }
//     this.listeners[event].push(callback);
//   },
//   off(event: string) {
//     delete this.listeners[event];
//   },
//   emit(event: string, data: any) {
//     if (this.listeners[event]) {
//       this.listeners[event].forEach(callback => callback(data));
//     }
//   }
// };

// function PresenceList() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [ofLine, setOfLine] = useState<User[]>([]);
//   const [onLine, setOnLine] = useState<User[]>([]);

//   useEffect(() => {
//     fakeSocketService.on('presenceUpdate', (updatedUser: User) => {
//       setUsers((prevUsers) => {
//         const userIndex = prevUsers.findIndex((u) => u.id === updatedUser.id);
//         if (userIndex !== -1) {
//           const newUsers = [...prevUsers];
//           newUsers[userIndex] = updatedUser;
//           return newUsers;
//         }
//         return [...prevUsers, updatedUser];
//       });
//     });

   
//     const mockUsers: User[] = [
//       { id: 1, status: 'online', onLine: true, name: 'Doe', firstName: 'John' },
//       { id: 2, status: 'offline', onLine: false, name: 'Smith', firstName: 'Jane' },
//       { id: 3, status: 'online', onLine: true, name: 'Brown', firstName: 'Bob' },
//       { id: 4, status: 'offline', onLine: false, name: 'Wilson', firstName: 'Alice' },
//       { id: 5, status: 'online', onLine: true, name: 'Taylor', firstName: 'Tom' },
//     ];

//     setUsers(mockUsers);
//     setOnLine(mockUsers.filter(user => user.onLine));
//     setOfLine(mockUsers.filter(user => !user.onLine));

   
//     const intervalId = setInterval(() => {
//       simulatePresenceChange();
//     }, 10000);

//     return () => {
//       fakeSocketService.off('presenceUpdate');
//       clearInterval(intervalId);
//     };
//   }, []);

//   useEffect(() => {
//     setOnLine(users.filter(user => user.onLine));
//     setOfLine(users.filter(user => !user.onLine));
//   }, [users]);

//   const simulatePresenceChange = () => {
//     if (users.length > 0) {
//       const randomIndex = Math.floor(Math.random() * users.length);
//       const updatedUser = { ...users[randomIndex] };
//       updatedUser.onLine = !updatedUser.onLine;
//       updatedUser.status = updatedUser.onLine ? 'online' : 'offline';
//       fakeSocketService.emit('presenceUpdate', updatedUser);
//     }
//   };

//   return (
//     <div className="presence-list">
//       <h1>Liste des présences</h1>
//       <details>
//         <summary>Non connectés({ofLine.length})</summary>
//         <ul className='studentOfLine'>
//         <br />
//           {ofLine.map((user) => (
//             <li key={user.id}>
//               {user.name} {user.firstName}
//             </li>
//           ))}
//         </ul>
//       </details>
//       <br />
//       <details>
//         <summary>Connectés ({onLine.length})</summary>
//         <br />
//         <ul className='studentonLine'>
//           {onLine.map((user) => (
//             <li key={user.id}>
//               {user.name} {user.firstName}
//             </li>
//           ))}
//         </ul>
//       </details>
//     </div>
//   );
// }
// export default PresenceList;


>>>>>>> c14778c1838949fb784f3d0c0f7bd1b4369ec968

