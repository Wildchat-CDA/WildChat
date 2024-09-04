import React, { useEffect, useState } from 'react';
import { MessageUpdatePaylod } from '../../../types/messageTypes';
import { editMessage } from '../../../services/message/EditMessage';
// import { updateMessage } from '../../../services/message/LoadMessage';
import './EditMessage.css';
import { handleKeyDown } from '../../../services/eventHandlerService';

const MessageEditor: React.FC<MessageUpdatePaylod> = ({
  name,
  message,
  index,
  roomId,
  setActiveEdit,
  updateMessage,
}) => {
 
  const [newMessage, setNewMessage] = useState(message);

  const cancelEdit = () => {
    setActiveEdit(false);
  };

  // Saving new message with all infos i need
  const handleSaveClick = () => {
    editMessage({ name, index, message: newMessage, roomId });
    setActiveEdit(false);
    updateMessage(newMessage, index);
  };

  return (
    <div className='message-editor'>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className='edit-input'
        onKeyDown={(e) => handleKeyDown(e, handleSaveClick, cancelEdit)}
      />
      <div className='valid-or-cancel_edit'>
        <span> échap pour </span>
        <button onClick={cancelEdit}>annuler</button>
        <span> ° entrée pour </span>
        <button onClick={handleSaveClick}>enregistrer</button>
      </div>
    </div>
  );
};

export default MessageEditor;
