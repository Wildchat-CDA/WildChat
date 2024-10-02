import './UserIcons.css';
import { webSocketService } from '../../services/webSocketService';
import { useEffect } from 'react';
import { IPeerIdOnRoomPayload } from '../../../../common/interface/redisInterface';

interface IUserIconsProps {
  peerList: string[];
  setPeerList: React.Dispatch<React.SetStateAction<string[]>>;
}

const UserIcons = ({ peerList, setPeerList }: IUserIconsProps) => {
  useEffect(() => {
    const addName = (data: IPeerIdOnRoomPayload) => {
      const userData = parsedData(data);
      setPeerList((prevState: string[]) => [...prevState, userData]);
    };

    const deleteName = (data: IPeerIdOnRoomPayload) => {
      const userData = parsedData(data);
      setPeerList((prevState: string[]) =>
        prevState.filter((infos) => infos !== userData)
      );
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
  }, [peerList]);

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
