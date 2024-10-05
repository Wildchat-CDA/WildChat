import './UserIcons.css';
import { webSocketService } from '../../services/webSocketService';
import { useEffect, useState } from 'react';
import { IPeerIdOnRoomPayload } from '../../../../common/interface/redisInterface';
import { loadPeerList } from '../../services/peerJS/fetchPeerList';
import { IChannel } from '../../types/sectionTypes';

interface IUserIconsProps {
  room: IChannel;
}

const UserIcons = ({ room }: IUserIconsProps) => {
  console.log('room', room);
  const [peerList, setPeerList] = useState<string[]>([]);

  useEffect(() => {
    loadPeerList(room).then((result) => {
      setPeerList(result);
    });
    const addName = (data: IPeerIdOnRoomPayload) => {
      if (data.roomUuid === room.uuid) {
        const userData = parsedData(data);
        setPeerList((prevState: string[]) => [...prevState, userData]);
      }
    };

    const deleteName = (data: IPeerIdOnRoomPayload) => {
      console.log('je passe dans delete name');
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

    webSocketService.on('join', addName);
    webSocketService.on('leave', deleteName);

    return () => {
      webSocketService.off('join', addName);
      webSocketService.off('leave', deleteName);
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
