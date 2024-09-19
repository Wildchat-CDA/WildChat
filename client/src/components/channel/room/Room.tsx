import './Room.css';

import { ModalTypeEnum } from '../../../context/ModalContext';
import { ModalContextType } from '../../../context/ModalContext';
import { NavigationContextType } from '../../../context/NavigationContext';
import { ISection, IChannel } from '../../../types/sectionTypes';
import EditButton from '../../common/button/edit/EditButton';
import DeleteButton from '../../common/button/delete/DeleteButton';
import ModalWrapper from '../../common/modal/ModalWrapper';

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
  const handleRoom = (room: IChannel) => {
    affectedCurrentSection(room);
  };

  // console.log('section : ', section);
  const affectedCurrentSection = (room: IChannel) => {
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

  return (
    <div className='rooms-container'>
      {section.channels.map((room) => (
        <div className='rooms-column' key={room.id}>
          <DeleteButton action={() => handleDeleteRoom(room)} />
          <EditButton action={() => handleEditRoom(room)} />
          <span
            className='room-span'
            onClick={() => {
              handleRoom(room);
              setActiveContentMainComp(true);
            }}
          >
            {room.title}
          </span>
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
