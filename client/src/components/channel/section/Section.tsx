import { useEffect, useState } from 'react';
import { fetchGetSection } from '../../../services/section/fetch/FetchGetSection';
import Room from '../room/Room';
import './Section.css';
import AddButton from '../../common/button/add/AddSectionButton';
import { useNavigation } from '../../../context/NavigationContext';
import { useModal } from '../../../context/ModalContext';
import { ISection } from '../../../types/sectionTypes';
import { ModalTypeEnum } from '../../../context/ModalContext';
import EditButton from '../../common/button/edit/EditButton';
import DeleteButton from '../../common/button/delete/DeleteButton';
import ModalWrapper from '../../common/modal/ModalWrapper';

interface ISectionProps {
  type: string;
}

const Section = ({ type }: ISectionProps) => {
  const {
    setCurrentSection,
    refresh,
    setActiveContentMainComp,
    currentSection,
    setIsClassRoom,
  } = useNavigation();
  const { setActiveModal, activeModal } = useModal();
  const [allRoomsAndChannels, setAllRoomsAndChannels] = useState([]);
  const [activeSection, setActiveSection] = useState<number[]>([]);

  useEffect(() => {
    try {
      fetchGetSection(type)
        .then((data) => {
          setAllRoomsAndChannels(data);
          if (type === 'classRoom') {
            const allIndexes = data.map((_: object, index: number) => index);
            setActiveSection(allIndexes);
          }
        })
        .catch((err) =>
          console.error('Erreur lors du chargement des rooms :', err)
        );
    } catch (error) {
      console.error(error);
    }
  }, [refresh]);

  const handleShow = (section: ISection, index: number) => {
    setActiveContentMainComp((prevState) =>
      prevState === true ? false : false
    );
    affectedCurrentSection(section);
    setActiveSection((prevActiveSections) => {
      // Vérifie si l'index est déjà présent
      const indexExists = prevActiveSections.includes(index);

      // Si l'index est présent, le retire ; sinon, l'ajoute
      const newActiveSections = indexExists
        ? prevActiveSections.filter((item) => item !== index)
        : [...prevActiveSections, index];

      return newActiveSections;
    });
  };

  const affectedCurrentSection = (section: ISection) => {
    const sectionPayload = {
      sectionId: section.id,
      sectionTitle: section.title,
      channelTitle: '',
      channelId: 0,
      uuid: '',
      messageIndex: null,
      currentMessage: '',
    };
    setCurrentSection(sectionPayload);
  };

  const handleNewSection = () => {
    setIsClassRoom(type === 'library' ? false : true);
    setActiveModal(ModalTypeEnum.NewSection);
  };

  const handleEditSection = (section: ISection) => {
    affectedCurrentSection(section);
    setActiveModal(ModalTypeEnum.EditSection);
  };

  const handleNewRoom = (section: ISection) => {
    affectedCurrentSection(section);
    setActiveModal(ModalTypeEnum.NewRoom);
  };

  const handleDeleteSection = (section: ISection) => {
    setActiveModal(ModalTypeEnum.DeleteSection);
    affectedCurrentSection(section);
  };

  return (
    <div className='section-container'>
      <ModalWrapper
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        currentSection={currentSection}
      />
      <div className='section-topic-title'>
        <h3>{type === 'library' ? 'Bibliothèque' : 'Salle de  classe'} </h3>
        <div className='topic-container'>
          <em className='topic-title'>Ajouter une section </em>
          <AddButton action={handleNewSection} />
        </div>
      </div>

      <div className='section-topic-column'>
        {allRoomsAndChannels.map((section: ISection, index) => (
          <div key={section.order} className='section-column'>
            <div className='title-container'>
              <div
                className='img-vector_container'
                onClick={() => handleShow(section, index)}
                aria-label='Ouvrir la section'
              >
                <img
                  src='icons/Vector.png'
                  className='icon-vector'
                  alt='Fleche vers le bas'
                />
              </div>
              <h5 className='section-title'>{section.title}</h5>
              <DeleteButton action={() => handleDeleteSection(section)} />
              <EditButton action={() => handleEditSection(section)} />
            </div>

            {activeSection.includes(index) && (
              <>
                <Room
                  section={section}
                  setCurrentSection={setCurrentSection}
                  setActiveContentMainComp={setActiveContentMainComp}
                  currentSection={currentSection}
                  setActiveModal={setActiveModal}
                  activeModal={activeModal}
                />
                <AddButton action={() => handleNewRoom(section)} />
              </>
            )}
          </div>
        ))}{' '}
      </div>
    </div>
  );
};

export default Section;
