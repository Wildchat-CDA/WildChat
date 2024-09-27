import './Room.css';
import { useUserRole } from '../../../context/UserRoleContext';
import { ModalTypeEnum } from '../../../context/ModalContext';
import { ModalContextType } from '../../../context/ModalContext';
import { NavigationContextType } from '../../../context/NavigationContext';
import { ISection, IChannel } from '../../../types/sectionTypes';
import EditButton from '../../common/button/edit/EditButton';
import DeleteButton from '../../common/button/delete/DeleteButton';
import ModalWrapper from '../../common/modal/ModalWrapper';
import UserIcons from '../../audio/UserIcons';
import { useAudio } from '../../../context/AudioContext';
import { JoinChannelResponse } from '../../../types/audioTypes';
import { v4 as uuidv4 } from 'uuid';
import { AudioCall } from '../../audio/AudioCall';
import { useEffect, useState } from 'react';

interface IRoomProps {
  section: ISection;
  currentSection: NavigationContextType['currentSection'];
  setCurrentSection: NavigationContextType['setCurrentSection'];
  setActiveContentMainComp: NavigationContextType['setActiveContentMainComp'];
  setActiveModal: ModalContextType['setActiveModal'];
  activeModal: ModalContextType['activeModal'];
}

function Room({
  section,
  setCurrentSection,
  setActiveContentMainComp,
  currentSection,
  setActiveModal,
  activeModal,
}: IRoomProps) {
  // const { socketRef, myPeerID, setChannelUUID } = useAudio();
  const { vocalChannelPosition, setVocalChannelPosition } = useUserRole();

  const handleRoom = (room: IChannel) => {
    affectedCurrentSection(room);
  };

  const affectedCurrentSection = (room: IChannel) => {
    //TODO USE user uuid
    const userUuid = '7a0fc143-0f76-442d-9c05-df3c37a4c5cf';
    // console.log('MyPeed :: ', myPeerID);
    console.log('roomUUID ', room.uuid);
    // socketRef.current.emit('join-channel', {
    //   peerID: myPeerID,
    //   roomUuid: room.uuid,
    //   userUuid: userUuid,
    // });
    console.log('uuid : ', userUuid);
    // setChannelUUID(room.uuid);

    setVocalChannelPosition(room.uuid);
    setCurrentSection({
      sectionId: section.id,
      sectionTitle: section.title,
      channelTitle: room.title,
      channelId: room.id,
      uuid: room.uuid,
      messageIndex: null,
      currentMessage: '',
    });
  };
  const handleEditRoom = (room: IChannel) => {
    affectedCurrentSection(room);
    setActiveModal(ModalTypeEnum.EditRoom);
  };

  const handleDeleteRoom = (room: IChannel) => {
    affectedCurrentSection(room);
    setActiveModal(ModalTypeEnum.DeleteRoom);
  };

  useEffect(() => {
    console.log('je passe dans room');
  }, [currentSection]);

  return (
    <div className='rooms-container'>
      {section.channels.map((room) => (
        <div className='rooms-column' key={room.id}>
          <DeleteButton action={() => handleDeleteRoom(room)} />
          <EditButton action={() => handleEditRoom(room)} />
          <div className='rooms-column-users'>
            <span
              className='room-span'
              onClick={() => {
                handleRoom(room);
                setActiveContentMainComp(true);
              }}
            >
              {room.title}
            </span>
            <div className='users'>
              {vocalChannelPosition === room.uuid && (
                <>
                  {' '}
                  <UserIcons />
                  <AudioCall currentSection={currentSection} />
                </>
              )}
            </div>
          </div>
        </div>
      ))}
      <ModalWrapper
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        currentSection={currentSection}
      />
    </div>
  );
}

export default Room;
