import DeleteAction from '../../button/delete/DeleteAction';
import { ModalContextType } from '../../../../context/ModalContext';
import { NavigationContextType } from '../../../../context/NavigationContext';
import { fetchDeleteSection } from '../../../../services/section/fetch/FetchDeleteSection';
import { useNavigation } from '../../../../context/NavigationContext';

interface IDeleteSectionProps {
  setActiveModal: ModalContextType['setActiveModal'];
  currentSection: NavigationContextType['currentSection'];
}

const DeleteSection = ({
  setActiveModal,
  currentSection,
}: IDeleteSectionProps) => {
  const { setRefresh } = useNavigation();

  const handleDelete = () => {
    fetchDeleteSection(currentSection.sectionId).then(() =>
      setRefresh((prevState) => prevState + 1)
    );
    setActiveModal(null);
  };

  const handleCancel = () => {
    setActiveModal(null);
  };
  return (
    <div>
      <h1>Supprimer la section</h1>
      <h2>Tu es sûr(e) de vouloir supprimer la section ?</h2>
      <em>
        Tous les canaux de cette section, ainsi que leur contenu, seront
        supprimés.
      </em>
      <div className='modal-name_container'>
        <span>{currentSection.sectionTitle}</span>
      </div>
      <DeleteAction handleCancel={handleCancel} handleDelete={handleDelete} />
    </div>
  );
};

export default DeleteSection;
