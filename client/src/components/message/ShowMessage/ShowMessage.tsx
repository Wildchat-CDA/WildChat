import React, { useEffect, useState, useRef } from 'react';
import { LoadMessage } from '../../../services/message/LoadMessage';
import socket from '../../../services/webSocketService';
import '../../../App.css';
import './ShowMessage.css';
import { Message } from '../../../types/messageTypes';
import MessageEditor from '../EditMessage/EditMessage';

const ShowMessage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeEdit, setActiveEdit] = useState<number>();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load messages with redis (init)
    LoadMessage()
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
  }, [messages]);

  const handleEdit = (index: number) => {
    setActiveEdit(index);
  };

  return (
    <div className='messages-container'>
      {messages.map((message, index) => (
        <div className='message-el' key={index}>
          <span className='message-name'>{message.name} </span>
          {activeEdit === index ? (
            <MessageEditor
              name={message.name}
              message={message.message}
              index={index}
              roomId={message.roomId}
            />
          ) : (
            <span>{message.message}</span>
          )}
          <span className='edit-span' onClick={() => handleEdit(index)}>
            EDIT
          </span>
        </div>
      ))}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ShowMessage;
