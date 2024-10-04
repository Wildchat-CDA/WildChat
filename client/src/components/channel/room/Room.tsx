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
import { AudioCall } from '../../audio/AudioCall';

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
  type,
}: IRoomProps) {
  const { vocalChannelPosition, setVocalChannelPosition } = useUserRole();

  const handleRoom = (room: IChannel) => {
    console.log('je passe');
    if (type === 'library') {
      setActiveContentMainComp(true);
    }
    affectedCurrentSection(room);
  };

  const affectedCurrentSection = (room: IChannel) => {
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
              }}
            >
              {room.title}
            </span>
            <div className='users'>
              {type === 'classRoom' && <UserIcons room={room} />}
              {vocalChannelPosition === room.uuid && type === 'classRoom' && (
                <>
                  {/* <UserIcons currentSection={currentSection} /> */}
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
