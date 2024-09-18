import React, { useState } from 'react';
import { fetchPutRoom } from '../../../../services/section/fetch/FetchPutRoom';
import { useNavigation } from '../../../../context/NavigationContext';

import { ModalContextType } from '../../../../context/ModalContext';
import { NavigationContextType } from '../../../../context/NavigationContext';

interface INewChannelInput {
  setActiveModal: ModalContextType['setActiveModal'];
  currentSection: NavigationContextType['currentSection'];
}

const EditRoomInput = ({
  currentSection,
  setActiveModal,
}: INewChannelInput) => {
  const { setRefresh } = useNavigation();
  const [inputValue, setInputValue] = useState<string>('');

  // console.log('CURRENT ROOM : ', currentSection);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Fonction pour soumettre la valeur actuelle
  const handleSubmit = () => {
    if (inputValue.length !== 0) {
      fetchPutRoom(currentSection, inputValue).then(() => {
        setRefresh((prevState) => prevState + 1);
        setActiveModal(null);
      });
    } else alert(`Valeur soumise incorrect`);
  };

  const handleCancel = () => {
    setActiveModal(null);
  };

  return (
    <div className='editRoom-container'>
      <label htmlFor='editRoomInput'>Modifer le nom du channel : </label>
      <input
        id='editRoomInput'
        type='text'
        value={inputValue}
        onChange={handleChange}
        aria-label='Modifier le nom du channel'
        placeholder={currentSection.channelTitle}
      />
      <div className='editRoom-btn_container'>
        <button onClick={handleCancel}>Annuler</button>
        <button onClick={handleSubmit}>Valider</button>
      </div>
    </div>
  );
};

export default EditRoomInput;
