import DeleteAction from '../../button/delete/DeleteAction';
import { ModalContextType } from '../../../../context/ModalContext';
import { NavigationContextType } from '../../../../context/NavigationContext';
import { fetchDeleteRoom } from '../../../../services/section/fetch/FetchDeleteRoom';
import { useNavigation } from '../../../../context/NavigationContext';

interface IDeleteSectionProps {
  setActiveModal: ModalContextType['setActiveModal'];
  currentSection: NavigationContextType['currentSection'];
}

const DeleteRoom = ({
  setActiveModal,
  currentSection,
}: IDeleteSectionProps) => {
  const { setRefresh } = useNavigation();
  const handleDelete = () => {
    fetchDeleteRoom(currentSection).then(() =>
      setRefresh((prevState) => prevState + 1)
    );
    setActiveModal(null);
  };

  const handleCancel = () => {
    setActiveModal(null);
  };
  return (
    <div>
      <h1>Supprimer le channel</h1>
      <h2>Tu es sûr(e) de vouloir supprimer le channel ?</h2>

      <em>Tous les messages du channel seront supprimés</em>
      <div className='modal-name_container'>
        <span>{currentSection.channelTitle}</span>
      </div>
      <DeleteAction handleCancel={handleCancel} handleDelete={handleDelete} />
    </div>
  );
};

export default DeleteRoom;
