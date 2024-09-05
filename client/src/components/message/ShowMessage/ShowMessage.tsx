import React, { useEffect, useState, useRef } from 'react';
import { LoadMessage } from '../../../services/message/LoadMessage';
import socket from '../../../services/webSocketService';
import '../../../App.css';
import './ShowMessage.css';
import { IMessage } from '../../../types/messageTypes';
import { useScrollToBottom } from '../../../services/useScrollBottom';
import MessageEditor from '../EditMessage/EditMessage';
import Modal from '../modal/Modal';

const ShowMessage: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [activeEdit, setActiveEdit] = useState<boolean>();
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [currentMessage, setCurrentMessage] = useState<string>();
  const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

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

  const activeDelete = (roomId, index) => {
    setCurrentIndex(index);
    setSelectedRoomId(roomId);
    setActiveModalDelete(true);
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
          <span className='name'>{message.name} </span>
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
              <img src='/icons/edit.png' alt='' className='icon-edit' />
            </span>
            <span
              className='span-action delete-span'
              onClick={() => {
                activeDelete(message.roomId, index);
                setCurrentMessage(message.message);
              }}
            >
              <img src='/icons/bdelete.png' className='icon-delete'></img>
            </span>
          </div>
        </div>
      ))}
      {activeModalDelete && (
        <Modal
          currentIndex={currentIndex}
          selectedRoomId={selectedRoomId}
          setMessages={setMessages}
          setActiveModalDelete={setActiveModalDelete}
          currentMessage={currentMessage}
        />
      )}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ShowMessage;
