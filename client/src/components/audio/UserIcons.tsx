import './UserIcons.css';
import { webSocketService } from '../../services/webSocketService';
import { useEffect, useState } from 'react';
import { IPeerIdOnRoomPayload } from '../../../../common/interface/redisInterface';
import { loadPeerList } from '../../services/peerJS/fetchPeerList';
import { NavigationContextType } from '../../context/NavigationContext';

interface IUserIconsProps {
  currentSection: NavigationContextType['currentSection'];
}

const UserIcons = ({ room }: any) => {
  const [peerList, setPeerList] = useState<string[]>([]);

  useEffect(() => {
    console.log('je passe dans room');
    loadPeerList(room).then((result) => {
      console.log('result : ', result);
      setPeerList(result);
    });
    const addName = (data: IPeerIdOnRoomPayload) => {
      console.log('addName userIicon ');

      if (data.roomUuid === room.uuid) {
        const userData = parsedData(data);
        setPeerList((prevState: string[]) => [...prevState, userData]);
      }
    };

    const deleteName = (data: IPeerIdOnRoomPayload) => {
      console.log('deleteName userIcon ');

      if (data.roomUuid === room.uuid) {
        const userData = parsedData(data);
        setPeerList((prevState: string[]) =>
          prevState.filter((infos) => infos !== userData)
        );
      }
    };

    const parsedData = (data: IPeerIdOnRoomPayload) => {
      return data.peerId + ':' + data.name;
    };

    webSocketService.on('join-room', addName);
    webSocketService.on('leave-room', deleteName);

    return () => {
      webSocketService.off('join-room', addName);
      webSocketService.off('leave-room', deleteName);
    };
  }, []);

  return (
    <div className='users-list_container'>
      {peerList.map((el: string, index: number) => {
        const name = el.split(':')[1];
        return (
          <li key={index} className='user-icon_list'>
            <div className='user-icon_container'>
              <img
                src='/icons/utilisateur.png'
                alt='Une personne'
                className='user-icon'
              />
            </div>
            <div className='user-name'> {name}</div>
          </li>
        );
      })}
    </div>
  );
};

export default UserIcons;
