import { useState, useEffect, useCallback } from 'react';
import { webSocketService } from '../../../services/webSocketService';
import { presenceService } from '../../../services/presence/presenceService';
import { User, PresenceUpdateData } from '../../../types/presenceTypes';
import './PresenceList.css';

const usePresence = (): User[] => {
  const [users, setUsers] = useState<User[]>([]);

  const handlePresenceUpdate = useCallback((updateData: PresenceUpdateData) => {
    console.log('je passe dans handlePresence');
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updateData.userId
          ? { ...user, status: updateData.status }
          : user
      )
    );
  }, []);

  useEffect(() => {
    const fetchInitialPresence = async () => {
      try {
        const data = await presenceService.getInitialPresence();
        setUsers(
          data.map((presenceData) => ({
            ...presenceData.user,
            status: presenceData.status,
          }))
        );
      } catch (error) {
        console.error('Error fetching presence data:', error);
      }
    };

    fetchInitialPresence();

    webSocketService.connect();
    webSocketService.on('presenceUpdate', handlePresenceUpdate);

    return () => {
      webSocketService.off('presenceUpdate', handlePresenceUpdate);
    };
  }, [handlePresenceUpdate]);

  return users;
};

const PresenceList = (): JSX.Element => {
  const users = usePresence();

  const onlineUsers = users.filter((user) => user.status === 'online');
  const offlineUsers = users.filter((user) => user.status === 'offline');

  const renderUserList = (userList: User[], className: string) => (
    <ul className={className}>
      {userList.map((user) => (
        <li key={`${user.id}-${user.status}`}>
          {user.name} {user.firstName}
        </li>
      ))}
    </ul>
  );

  return (
    <div className='presence-list'>
      <h1>Liste des présences</h1>
      <details>
        <summary>Non connectés ({offlineUsers.length})</summary>
        {renderUserList(offlineUsers, 'studentOffline')}
      </details>
      <details>
        <summary>Connectés ({onlineUsers.length})</summary>
        {renderUserList(onlineUsers, 'studentOnline')}
      </details>
    </div>
  );
};

export default PresenceList;
