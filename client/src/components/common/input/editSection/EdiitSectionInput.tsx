import React, { useState } from 'react';
import { fetchPutSection } from '../../../../services/section/fetch/FetchPutSection';
import { useNavigation } from '../../../../context/NavigationContext';

import { ModalContextType } from '../../../../context/ModalContext';
import { NavigationContextType } from '../../../../context/NavigationContext';

interface INewChannelInput {
  setActiveModal: ModalContextType['setActiveModal'];
  currentSection: NavigationContextType['currentSection'];
}

const EditSectionInput = ({
  currentSection,
  setActiveModal,
}: INewChannelInput) => {
  const { setRefresh } = useNavigation();
  const [inputValue, setInputValue] = useState<string>('');

  console.log('CURRENT SECTION : ', currentSection);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Fonction pour soumettre la valeur actuelle
  const handleSubmit = () => {
    if (inputValue.length !== 0) {
      fetchPutSection(currentSection, inputValue).then(() => {
        setRefresh((prevState) => prevState + 1);
        setActiveModal(null);
      });
    } else alert(`Valeur soumise incorrect`);
  };

  const handleCancel = () => {
    setActiveModal(null);
  };

  return (
    <div className='editSection-container'>
      <label htmlFor='editSectionInput'>Modifer le nom de la section : </label>
      <input
        id='editSectionInput'
        type='text'
        value={inputValue}
        onChange={handleChange}
        aria-label='Modifier le nom de la section'
        placeholder={currentSection.sectionTitle}
      />
      <div className='editSection-btn_container'>
        <button onClick={handleCancel}>Annuler</button>
        <button onClick={handleSubmit}>Valider</button>
      </div>
    </div>
  );
};

export default EditSectionInput;
