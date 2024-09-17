import './Room.css';
import { ISectionChannel } from '../../../types/sectionTypes';
import AddButton from '../../common/button/AddSectionButton';

import Modal from '../../common/modal/Modal';
import NewChannelInput from '../../common/input/newChannel/NewChannelInput';
import { ModalTypeEnum } from '../../../context/ModalContext';
import { ModalContextType } from '../../../context/ModalContext';
import { NavigationContextType } from '../../../context/NavigationContext';
import { ISection, IChannel } from '../../../types/sectionTypes';
interface IRoomProps {
  rooms: ISection['channels'];
  currentSection: NavigationContextType['currentSection'];
  setCurrentSection: NavigationContextType['setCurrentSection'];
  setActiveContentMainComp: NavigationContextType['setActiveContentMainComp'];
  setActiveModal: ModalContextType['setActiveModal'];
  activeModal: ModalContextType['activeModal'];
}

function Room({
  rooms,
  setCurrentSection,
  setActiveContentMainComp,
  currentSection,
  setActiveModal,
  activeModal,
}: IRoomProps) {
  const handleRoom = (room: IChannel) => {
    setCurrentSection((prevState: ISectionChannel) => ({
      ...prevState,
      channelTitle: room.title,
      uuid: room.uuid,
    }));
  };

  const newRoom = () => {
    setActiveModal(ModalTypeEnum.NewRoom);
  };

  return (
    <div className='rooms-container'>
      {rooms.map((room) => {
        return (
          <div>
            <span
              className='room-span'
              onClick={() => {
                handleRoom(room);
                setActiveContentMainComp(true);
              }}
            >
              {room.title}{' '}
            </span>
          </div>
        );
      })}
      <AddButton action={newRoom} />
      {activeModal === ModalTypeEnum.NewRoom && (
        <Modal>
          <NewChannelInput
            setActiveModal={setActiveModal}
            currentSection={currentSection}
          />
        </Modal>
      )}
    </div>
  );
}

export default Room;
