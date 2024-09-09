import React, { useEffect, useState } from 'react';
import { fetchRooms } from '../../../services/room/fetch/FetchRoom';
import Room from '../room/Room';
import './Section.css';

const Section = () => {
  const [allRoomsAndChannels, setAllRoomsAndChannels] = useState([]);
  const [activeSection, setActiveSection] = useState<number[]>([]);

  useEffect(() => {
    fetchRooms()
      .then(setAllRoomsAndChannels)
      .catch((err) =>
        console.error('Erreur lors du chargement des rooms :', err)
      );
  }, []);

  const handleShow = (index: number) => {
    setActiveSection((prevActiveSections) => {
      // Vérifie si l'index est déjà présent
      const indexExists = prevActiveSections.includes(index);

      // Si l'index est présent, le retire ; sinon, l'ajoute
      const newActiveSections = indexExists
        ? prevActiveSections.filter((item) => item !== index)
        : [...prevActiveSections, index];

      console.log('je passe', newActiveSections);
      return newActiveSections;
    });
  };
  return (
    <div>
      <h3>Bibliothèque</h3>
      <div>
        {allRoomsAndChannels.map((section, index) => (
          <div key={section.order} className='section-column'>
            <h5 onClick={() => handleShow(index)}>{section.title} </h5>

            {activeSection.includes(index) && <Room rooms={section.channels} />}
          </div>
        ))}{' '}
      </div>
    </div>
  );
};

export default Section;
