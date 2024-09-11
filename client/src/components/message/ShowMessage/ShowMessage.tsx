import React, { useEffect, useState } from 'react';
import { LoadMessage } from '../../../services/message/fetch/LoadMessage';
import socket from '../../../services/webSocketService';
import '../../../App.css';
import './ShowMessage.css';
import { IMessagePostPayload } from '../../../../../common/interface/messageInterface';
import { useScrollToBottom } from '../../../services/useScrollBottom';
import MessageEditor from '../EditMessage/EditMessage';
import Modal from '../modal/Modal';
import { useActiveChannel } from '../../../context/ChannelContext';

const ShowMessage: React.FC = () => {
  const [messages, setMessages] = useState<IMessagePostPayload[]>([]);
  const [activeEdit, setActiveEdit] = useState<boolean>();
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [currentMessage, setCurrentMessage] = useState<string>();
  const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const { currentChannel } = useActiveChannel();

  const name = 'Théo'; // TODO Need to use an userContext

  useEffect(() => {
    // Load messages with redis (init)
    LoadMessage(currentChannel)
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
  }, [currentChannel]);

  const scrollRef = useScrollToBottom(messages);

  const handleEdit = (index: number) => {
    setActiveEdit(true);
    setCurrentIndex(index);
    console.log('NAME : ', name);
    console.log('MESSAGE NAME : ', messages);
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
      <div className='h-room_container'>
        <h3 className='h-room'># : Nom de la room</h3>
      </div>

      <div className='messages-column' aria-live='polite'>
        {messages.map((message, index) => (
          <div className='message-el' key={index}>
            <span className='name'>{message.name} </span>
            {currentIndex === index &&
            activeEdit === true &&
            name == message.name ? (
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
            {name !== message.name && (
              <div className='span-action_container'>
                <span
                  aria-label='Modifier ce message'
                  className=' span-action edit-span'
                  onClick={() => handleEdit(index)}
                >
                  <img
                    src='/icons/edit.png'
                    alt='crayon édiion messages'
                    className='icon-edit'
                  />
                </span>
                <span
                  aria-label='Supprimer ce message'
                  className='span-action delete-span'
                  onClick={() => {
                    activeDelete(message.roomId, index);
                    setCurrentMessage(message.message);
                  }}
                >
                  <img
                    src='/icons/bdelete.png'
                    className='icon-delete'
                    alt='poubelle de supression de messages'
                  ></img>
                </span>
              </div>
            )}
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
    </div>
  );
};

export default ShowMessage;
