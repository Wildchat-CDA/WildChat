import './Modal.css';
import React from 'react';
import { deleteMessage } from '../../../services/message/fetch/DeleteMessage';

const Modal = ({
  currentIndex,
  selectedRoomId,
  setMessages,
  setActiveModalDelete,
  currentMessage,
}) => {
  
  const handleDelete = () => {
    const data = { roomId: selectedRoomId, index: currentIndex };
    deleteMessage(data)
      .then(() => {
        setMessages((prevMessages) =>
          prevMessages.filter((_, i) => i !== currentIndex)
        );
        setActiveModalDelete(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du message :', error);
      });
  };

  const handleCancel = () => {
    setActiveModalDelete(false);
  };

  return (
    <div className='modal-bg'>
      <div className='modal-container'>
        <div className='modal-main_container'>
          <h1>Supprimer le message</h1>
          <h2>Tu es sûr(e) de vouloir supprimer ce message ?</h2>
        </div>
        <div className='modal-name_container'>
          <span className='name'>BOB</span> <br />
          <span>{currentMessage}</span>
        </div>

        <div className='modal-btn_container'>
          <button
            className='modal-btn modal-btn_cancel'
            onClick={() => handleCancel()}
          >
            Annuler
          </button>
          <button
            className='modal-btn modal-btn_delete'
            onClick={() => handleDelete()}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
