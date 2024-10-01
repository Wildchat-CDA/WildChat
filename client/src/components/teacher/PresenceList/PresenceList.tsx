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
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  }, []);

  useEffect(() => {
    const handleInitialPresence = (initialUsers: User[]) => {
      setUsers(initialUsers);
    };

    const handlePresenceUpdateEvent = (updatedUser: User) => {
      handlePresenceUpdate(updatedUser);
    };

    webSocketService.connect();
    webSocketService.on('initialPresence', handleInitialPresence);
    webSocketService.on('presenceUpdate', handlePresenceUpdateEvent);
    webSocketService.emit('getPresence');

    return () => {
      webSocketService.off('initialPresence', handleInitialPresence);
      webSocketService.off('presenceUpdate', handlePresenceUpdateEvent);
    };
  }, [handlePresenceUpdate]);

  return users;
};

const PresenceList = (): JSX.Element => {
  const users = usePresence();

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