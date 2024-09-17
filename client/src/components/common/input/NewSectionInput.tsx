import React, { useState } from 'react';
import { fetchPostSection } from '../../../services/section/fetch/FetchPostSection';
import { useNavigation } from '../../../context/NavigationContext';
import './NewSectionInput.css';

const NewSectionInput = ({ setActiveModal }) => {
  const { setRefresh } = useNavigation();
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Fonction pour soumettre la valeur actuelle
  const handleSubmit = () => {
    if (inputValue.length !== 0) {
      fetchPostSection(inputValue).then(() => {
        setRefresh((prevState) => prevState + 1);
        setActiveModal(null);
      });
    } else alert(`Valeur soumise incorrect`);
  };

  const handleCancel = () => {
    setActiveModal(null);
  };

  return (
    <div className='newSection-container'>
      <label htmlFor='sectionInput'>Nouvelle section :</label>
      <input
        id='sectionInput'
        type='text'
        value={inputValue}
        onChange={handleChange}
        aria-label='Saisir le nom de la nouvelle section'
      />
      <div className='newSection-btn_container'>
        <button onClick={handleSubmit}>Valider</button>
        <button onClick={handleCancel}>Annuler</button>
      </div>
    </div>
  );
};

export default NewSectionInput;
