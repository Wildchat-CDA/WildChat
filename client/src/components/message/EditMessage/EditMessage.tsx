import React, { useState } from 'react';
import { IMessageUpdateProps } from '../../../types/messageTypes';
import { editMessage } from '../../../services/message/EditMessage';
import { useScrollToBottom } from '../../../services/useScrollBottom';
import './EditMessage.css';
import { handleKeyDown } from '../../../services/eventHandlerService';

const MessageEditor: React.FC<IMessageUpdateProps> = ({
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
    if (newMessage.length !== 0) {
      editMessage({ name, index, message: newMessage, roomId });
      setActiveEdit(false);
      updateMessage(newMessage, index);
    }
  };

  const scrollRef = useScrollToBottom(newMessage);

  return (
    <div className='message-editor'>
      <div ref={scrollRef}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className='edit-input'
          onKeyDown={(e) => handleKeyDown(e, handleSaveClick, cancelEdit)}
        />
      </div>
      <div className='valid-or-cancel_edit'>
        <span> échap pour </span>
        <button onClick={cancelEdit}>annuler</button>
        <span> entrée pour </span>
        <button onClick={handleSaveClick}>enregistrer</button>
      </div>
    </div>
  );
};

export default MessageEditor;
