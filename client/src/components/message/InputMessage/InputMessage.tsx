import React, { useState, useRef, useEffect } from 'react';
import { handleKeyDown } from '../../../services/eventHandlerService';
import socket from '../../../services/webSocketService';
import './InputMessage.css';
import '../../../App.css';

const InputMessage = () => {
  const [input, setInput] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const name = 'BOB'; // TODO: Use context for user
  const roomId = 1; // TODO: Retrieve roomId from context or props

  // Adjust height of textarea based on content
  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // Reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set height based on content
    }
  };

  useEffect(() => {
    adjustHeight(); // Adjust height on initial render and whenever input changes
  }, [input]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length !== 0) {
      const payload = { name, message: input, roomId };
      socket.emit('message', payload);
      setInput(''); // Clear input field
    }
  };

  return (
    <div className='input-message-container'>
      <form onSubmit={onSubmit}>
        <textarea
          ref={textAreaRef}
          className='input-message'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            adjustHeight(); // Adjust height when input changes
          }}
          onKeyDown={(e) => handleKeyDown(e, onSubmit, () => setInput(''))}
          placeholder='Envoyer un message'
        ></textarea>
      </form>
    </div>
  );
};

export default InputMessage;
