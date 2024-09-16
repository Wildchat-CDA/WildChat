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
  


  return (
    <div className='modal-bg'>
      <div className='modal-container'>
        <div className='modal-main_container'>
         
        </div>
      </div>
    </div>
  );
};

export default Modal;
