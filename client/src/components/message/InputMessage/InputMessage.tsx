import React, { useState } from 'react';
import { handleKeyDown } from '../../../services/eventHandlerService';
import socket from '../../../services/webSocketService';
import './InputMessage.css';
import '../../../App.css';

const InputMessage = () => {
  const [input, setInput] = useState('');
  //TODO - Use context pour user
  const name = 'BOB';

  //TODO - DO SOMETHING
  const roomId = 1;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, message: input, roomId: roomId };
    socket.emit('message', payload);
    setInput('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea
          className='input-message'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, onSubmit, () => setInput(''))}
          placeholder='Envoyer un message'
        ></textarea>
      </form>
    </div>
  );
};

export default InputMessage;
