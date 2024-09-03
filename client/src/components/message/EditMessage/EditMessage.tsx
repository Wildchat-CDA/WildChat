import React, { useState } from 'react';
import { MessageUpdate } from '../../../types/messageTypes';
import { editMessage } from '../../../services/message/EditMessage';

const MessageEditor: React.FC<MessageUpdate> = ({
  message,
  index,
  roomId,
  // onSave,
  // onCancel,
}) => {
  const [newMessage, setNewMessage] = useState(message);

  const handleSaveClick = () => {
    // onSave(newMessage); // Call onSave with the new message
    editMessage({ index, message: newMessage, roomId });
  };

  return (
    <div className='message-editor'>
      <input
        type='text'
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSaveClick}>Save</button>
      {/* <button onClick={onCancel}>Cancel</button> */}
    </div>
  );
};

export default MessageEditor;
