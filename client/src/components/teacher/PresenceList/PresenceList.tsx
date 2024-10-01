import React, { useState, useEffect, useCallback } from 'react';
import { webSocketService } from '../../../services/webSocketService';
import './PresenceList.css';

interface User {
  id: string;
  name: string;
  firstName: string;
  status: 'online' | 'offline';
}

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

export default PresenceList;