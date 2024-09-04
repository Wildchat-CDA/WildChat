import React, { useEffect, useState, useRef } from 'react';
import { LoadMessage } from '../../../services/message/LoadMessage';
import socket from '../../../services/webSocketService';
import '../../../App.css';
import './ShowMessage.css';
import { IMessage } from '../../../types/messageTypes';
import { useScrollToBottom } from '../../../services/useScrollBottom';
import MessageEditor from '../EditMessage/EditMessage';
import { deleteMessage } from '../../../services/message/DeleteMessage';

const ShowMessage: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [activeEdit, setActiveEdit] = useState<boolean>();
  const [currentIndex, setCurrentIndex] = useState<number>();

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

  const scrollRef = useScrollToBottom(messages);

  const handleEdit = (index: number) => {
    setActiveEdit(true);
    setCurrentIndex(index);
  };

  const handleDelete = (roomId: number, index: number) => {
    const data = { roomId, index };
    deleteMessage(data)
      .then(() => {
        setMessages((prevMessages) =>
          prevMessages.filter((_, i) => i !== index)
        );
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du message :', error);
      });
  };

  // Update message in message Array
  const updateMessage = (msg: string, index: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((message, i) =>
        i === index ? { ...message, message: msg } : message
      )
    );
  };

  return (
    <div className='messages-container'>
      {messages.map((message, index) => (
        <div className='message-el' key={index}>
          <span className='message-name'>{message.name} </span>
          {currentIndex === index && activeEdit === true ? (
            <MessageEditor
              name={message.name}
              message={message.message}
              index={index}
              roomId={message.roomId}
              setActiveEdit={setActiveEdit}
              setMessages={setMessages}
              updateMessage={updateMessage}
            />
          ) : (
            <span>{message.message}</span>
          )}
          <div className='span-action_container'>
            <span
              className=' span-action edit-span'
              onClick={() => handleEdit(index)}
            >
              MODIFIER
            </span>
            <span
              className='span-action delete-span'
              onClick={() => handleDelete(message.roomId, index)}
            >
              SUPPRIMER
            </span>
          </div>
        </div>
      ))}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ShowMessage;
