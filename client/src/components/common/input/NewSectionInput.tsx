import React, { useState } from 'react';
import { fetchPostSection } from '../../../services/section/fetch/FetchPostSection';

const NewSectionInput: React.FC = () => {
  // État pour stocker la valeur de l'input
  const [inputValue, setInputValue] = useState<string>('');

  // Fonction pour gérer le changement de valeur dans l'input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Fonction pour soumettre la valeur actuelle
  const handleSubmit = () => {
    fetchPostSection(inputValue);
    alert(`Valeur soumise : ${inputValue}`);
  };

  return (
    <div>
      <label htmlFor='sectionInput'>Nouvelle section :</label>
      <input
        id='sectionInput'
        type='text'
        value={inputValue}
        onChange={handleChange}
        aria-label='Saisir le nom de la nouvelle section'
      />
      <button onClick={handleSubmit}>Valider</button>
    </div>
  );
};

export default NewSectionInput;
