import { ModalTypeEnum } from '../../../context/ModalContext';
import NewChannelInput from '../input/newChannel/NewChannelInput';
import EditSectionInput from '../input/editSection/EdiitSectionInput';
import DeleteSection from './delete/DeleteSection';
import NewSectionInput from '../input/newSection/NewSectionInput';
import EditRoomInput from '../input/editRoom/EditRoomInput';
import DeleteRoom from './delete/DeleteRoom';
import DeleteMessage from '../../message/deleteMessage/DeleteMessage';
import Modal from './Modal';
import { ModalContextType } from '../../../context/ModalContext';
import { NavigationContextType } from '../../../context/NavigationContext';
import { IMessageUpdateProps } from '../../../types/messageTypes';

interface ModalWrapperProps {
  activeModal: ModalContextType['activeModal'];
  setActiveModal: ModalContextType['setActiveModal'];
  currentSection: NavigationContextType['currentSection'];
  setMessage?: IMessageUpdateProps['setMessages'];
}

const ModalWrapper = ({
  activeModal,
  setActiveModal,
  currentSection,
  setMessage,
}: ModalWrapperProps) => {
  let modalContent;

  switch (activeModal) {
    case ModalTypeEnum.DeleteMessage:
      modalContent = (
        <DeleteMessage
          setMessage={setMessage!}
          setActiveModal={setActiveModal}
        />
      );
      break;
    case ModalTypeEnum.DeleteSection:
      modalContent = (
        <DeleteSection
          setActiveModal={setActiveModal}
          currentSection={currentSection}
        />
      );
      break;
    case ModalTypeEnum.NewSection:
      modalContent = <NewSectionInput setActiveModal={setActiveModal} />;
      break;
    case ModalTypeEnum.NewRoom:
      modalContent = (
        <NewChannelInput
          currentSection={currentSection}
          setActiveModal={setActiveModal}
        />
      );
      break;

    case ModalTypeEnum.EditSection:
      modalContent = (
        <EditSectionInput
          currentSection={currentSection}
          setActiveModal={setActiveModal}
        />
      );
      break;
    case ModalTypeEnum.EditRoom:
      modalContent = (
        <EditRoomInput
          currentSection={currentSection}
          setActiveModal={setActiveModal}
        />
      );
      break;
    case ModalTypeEnum.DeleteRoom:
      modalContent = (
        <DeleteRoom
          setActiveModal={setActiveModal}
          currentSection={currentSection}
        />
      );
      break;

    default:
      return null;
  }

  return <Modal>{modalContent}</Modal>;
};

export default ModalWrapper;
