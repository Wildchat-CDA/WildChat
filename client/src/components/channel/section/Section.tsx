import React, { useEffect, useState } from 'react';
import { fetchGetSection } from '../../../services/section/fetch/FetchGetSection';
import Room from '../room/Room';
import './Section.css';
import AddSectionButton from '../../common/button/AddSectionButton';
import Modal from '../../common/modal/Modal';
import NewSectionInput from '../../common/input/NewSectionInput';
import { useNavigation } from '../../../context/NavigationContext';
import { useModal } from '../../../context/ModalContext';
import { ISection } from '../../../types/sectionTypes';
import { ModalTypeEnum } from '../../../context/ModalContext';

const Section = () => {
  const [allRoomsAndChannels, setAllRoomsAndChannels] = useState([]);
  const [activeSection, setActiveSection] = useState<number[]>([]);
  const { setCurrentSection, refresh } = useNavigation();
  const { setActiveModal, activeModal } = useModal();

  useEffect(() => {
    fetchGetSection()
      .then((data) => {
        setAllRoomsAndChannels(data);
      })
      .catch((err) =>
        console.error('Erreur lors du chargement des rooms :', err)
      );
  }, [refresh]);

  const handleShow = (section: ISection, index: number) => {
    const sectionPayload = {
      sectionTitle: section.title,
      channelTitle: '',
      uuid: '',
      messageIndex: null,
      currentMessage: '',
    };

    setCurrentSection(sectionPayload);
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

  const handleNewSection = () => {
    setActiveModal(ModalTypeEnum.NewSection);
  };
  return (
    <div className='library-container'>
      <h3>Bibliothèque</h3>
      <div className='topic-container' onClick={handleNewSection}>
        <h4 className='topic-title'>Topic </h4>
        <AddSectionButton />
      </div>

      <div>
        {activeModal === ModalTypeEnum.NewSection && (
          <Modal>
            <NewSectionInput setActiveModal={setActiveModal} />
          </Modal>
        )}
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
            </div>

            {activeSection.includes(index) && (
              <Room
                rooms={section.channels}
                setCurrentSection={setCurrentSection}
              />
            )}
          </div>
        ))}{' '}
      </div>
    </div>
  );
};

export default Section;
