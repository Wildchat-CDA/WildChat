import React, { useState, useRef, useEffect } from 'react';
import { handleKeyDown } from '../../../services/eventHandlerService';
import socket from '../../../services/webSocketService';
import './InputMessage.css';
import '../../../App.css';
import { useActiveChannel } from '../../../context/ChannelContext';

const InputMessage = () => {
  const [input, setInput] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const name = 'Théo'; // TODO: Use context for user
  const { currentChannel } = useActiveChannel();

  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length !== 0) {
      const payload = { name, message: input, roomId: currentChannel };
      socket.emit('message', payload);
      setInput('');
    }
  };

  return (
    <div className='input-message-container'>
      <form onSubmit={onSubmit}>
        <label htmlFor='messageInput' className='visually-hidden'>
          Message
        </label>
        <textarea
          id='messageInput'
          ref={textAreaRef}
          className='input-message'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            adjustHeight();
          }}
          onKeyDown={(e) => handleKeyDown(e, onSubmit, () => setInput(''))}
          placeholder='Envoyer un message'
        ></textarea>
      </form>
    </div>
  );
};

export default InputMessage;
