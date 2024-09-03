import React, { useEffect, useState, useRef } from 'react';
import { loadMessage } from '../../services/messageService';
import socket from '../../services/webSocketService';
import '../../App.css';
import './ShowMessage.css';
import { Message } from '../../types/messageTypes';

const ShowMessage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load messages with redis (init)
    loadMessage()
      .then(setMessages)
      .catch((error) =>
        console.error('Erreur lors du chargement des messages :', error)
      );

    // Load new messages with socket.Io
    const handleMessage = (payload) =>
      setMessages((preMessages) => [...preMessages, payload]);
    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    console.log('messages : ', messages);
  }, [messages]);

  return (
    <div className='messages-container'>
      {messages.map((message, index) => (
        <div className='message-el' key={index}>
          <span className='message-name'>{message.name} </span>{' '}
          {message.message}
        </div>
      ))}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ShowMessage;
