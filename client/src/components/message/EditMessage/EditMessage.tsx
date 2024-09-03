import React, { useState } from 'react';
import { MessageUpdate } from '../../../types/messageTypes';
import { editMessage } from '../../../services/message/EditMessage';
import './EditMessage.css';

const MessageEditor: React.FC<MessageUpdate> = ({
  name,
  message,
  index,
  roomId,

  // onSave,
  // onCancel,
}) => {
  const [newMessage, setNewMessage] = useState(message);

  // Saving new message with all infos i need
  const handleSaveClick = () => {
    editMessage({ name, index, message: newMessage, roomId });
  };

  return (
    <div className='message-editor'>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className='edit-input'
      />
      <div className='valid-or-cancel_edit'>
        {' '}
        <span> échap pour </span>
        <button onClick={handleSaveClick}>annuler</button>
        <span> ° entrée pour </span>
        <button onClick={handleSaveClick}>enregistrer</button>
      </div>

      {/* <button onClick={onCancel}>Cancel</button> */}
    </div>
  );
};

export default MessageEditor;
