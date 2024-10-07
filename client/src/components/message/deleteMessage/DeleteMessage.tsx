import { useNavigation } from '../../../context/NavigationContext';

import { deleteMessage } from '../../../services/message/fetch/DeleteMessage';
import { IModalMessagePayload } from '../../../types/messageTypes';
import { ModalContextType } from '../../../context/ModalContext';
import DeleteAction from '../../common/button/delete/DeleteAction';
import Cookies from 'js-cookie';

interface IDeleteMessageProps {
  setMessage: IModalMessagePayload['setMessages'];
  setActiveModal: ModalContextType['setActiveModal'];
}

const DeleteMessage = ({ setMessage, setActiveModal }: IDeleteMessageProps) => {
  const { currentSection } = useNavigation();
  const handleDelete = () => {
    const data = {
      roomId: currentSection.uuid,
      index: currentSection.messageIndex,
    };
    deleteMessage(data)
      .then(() => {
        setMessage((prevMessages) =>
          prevMessages.filter((_, i) => i !== data.index)
        );
        setActiveModal(null);
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du message :', error);
      });
  };

  const handleCancel = () => {
    setActiveModal(null);
  };
  return (
    <div>
      <h1>Supprimer le message</h1>
      <h2>Tu es sûr(e) de vouloir supprimer ce message ?</h2>

      <div className='modal-name_container'>
        <span className='name'>BOB</span> <br />
        <span>{currentSection.currentMessage}</span>
      </div>
      <DeleteAction handleCancel={handleCancel} handleDelete={handleDelete} />
    </div>
  );
};

export default DeleteMessage;
