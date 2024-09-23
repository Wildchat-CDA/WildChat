import React, { useState } from 'react';
import { fetchPostRoom } from '../../../../services/section/fetch/FetchPostRoom';
import { useNavigation } from '../../../../context/NavigationContext';
import './NewChannelInput.css';
import { ModalContextType } from '../../../../context/ModalContext';
import { NavigationContextType } from '../../../../context/NavigationContext';

interface INewChannelInput {
  setActiveModal: ModalContextType['setActiveModal'];
  currentSection: NavigationContextType['currentSection'];
}

const NewChannelInput = ({
  setActiveModal,
  currentSection,
}: INewChannelInput) => {
  const { setRefresh } = useNavigation();
  const [inputValue, setInputValue] = useState<string>('');
  const [slotValue, setSlotValue] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Fonction pour soumettre la valeur actuelle
  const handleSubmit = () => {
    if (inputValue.length !== 0) {
      fetchPostRoom(currentSection, inputValue, slotValue).then(() => {
        setRefresh((prevState) => prevState + 1);
        setActiveModal(null);
      });
    } else alert(`Valeur soumise incorrect`);
  };

  const handleCancel = () => {
    setActiveModal(null);
  };

  return (
    <div className='newRoom-container'>
      <label htmlFor='roomInput'>Nouveau channel :</label>
      <input
        id='roomInput'
        type='text'
        value={inputValue}
        onChange={handleChange}
        aria-label='Saisir le nom du nouveau channel'
      />
      <label htmlFor='roomSlot'>Slot Maximum</label>
      <input
        type='text'
        id='roomSlot'
        value={slotValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className='newRoom-btn_container'>
        <button onClick={handleCancel}>Annuler</button>
        <button onClick={handleSubmit}>Valider</button>
      </div>
    </div>
  );
};

export default NewChannelInput;
