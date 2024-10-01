import React, { useState } from 'react';
import { IMessageUpdateProps } from '../../../types/messageTypes';
import { editMessage } from '../../../services/message/fetch/EditMessage';
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
  const [error, setError] = useState<string | null>(null);

  const cancelEdit = () => {
    setActiveEdit(false);
  };

  const handleSaveClick = async () => {
    if (newMessage.length === 0) {
      setError('Message cannot be empty');
      return;
    }
    
    setError(null);
    try {
      console.log('Sending edit request:', { name, index, message: newMessage, roomId });
      await editMessage({ name, index, message: newMessage, roomId });
      console.log('Edit successful');
      setActiveEdit(false);
       console.log(newMessage, 'edition');
      updateMessage(newMessage, index);
    } catch (error) {
      console.error('Failed to edit message:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <div className='message-editor'>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className='edit-input'
        onKeyDown={(e) => handleKeyDown(e, handleSaveClick, cancelEdit)}
      />
      {error && <div className="error-message">{error}</div>}
      <div className='valid-or-cancel_edit'>
        <span>échap pour</span>
        <button onClick={cancelEdit}>annuler</button>
        <span>entrée pour</span>
        <button onClick={handleSaveClick}>enregistrer</button>
      </div>
    </div>
  );
};

export default MessageEditor;