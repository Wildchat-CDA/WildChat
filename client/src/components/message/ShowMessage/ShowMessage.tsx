import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LoadMessage } from '../../../services/message/fetch/LoadMessage';
import socket from '../../../services/webSocketService';
import '../../../App.css';
import './ShowMessage.css';
import { IMessagePostPayload } from '../../../../../common/interface/messageInterface';
import { useScrollToBottom } from '../../../services/useScrollBottom';
import MessageEditor from '../EditMessage/EditMessage';
import { useNavigation } from '../../../context/NavigationContext';
import { ISectionChannel } from '../../../types/sectionTypes';
import { ModalTypeEnum } from '../../../context/ModalContext';
import { useModal } from '../../../context/ModalContext';
import DeleteButton from '../../common/button/delete/DeleteButton';
import ModalWrapper from '../../common/modal/ModalWrapper';

const ShowMessage: React.FC = () => {
  const [messages, setMessages] = useState<IMessagePostPayload[]>([]);
  const [activeEdit, setActiveEdit] = useState<boolean>();
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [currentMessage, setCurrentMessage] = useState<string>();
  const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const { currentSection } = useNavigation();

  const name = 'Théo'; // TODO Need to use an 




  useEffect(() => {
    // Load messages with redis (init)
    LoadMessage(currentSection)
      .then(setMessages)
      .catch((error) =>
        console.error('Erreur lors du chargement des messages :', error)
      );

    // Load new messages with socket.Io
    const handleMessage = (payload: IMessagePostPayload) => {
      setMessages((preMessages) => [...preMessages, payload]);
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [currentSection]);

  

  const scrollRef = useScrollToBottom(messages);

  const handleEdit = (index: number) => {
    setActiveEdit(true);
    setCurrentIndex(index);
  };

  const activeDelete = (message: string, index: number) => {
    setActiveModal(ModalTypeEnum.DeleteMessage);
    setCurrentIndex(index);
    setCurrentSection((prevState: ISectionChannel) => ({
      ...prevState,
      messageIndex: index,
      currentMessage: message,
    }));
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
        {currentSection && (
          <h3 className='h-room'>
            #{currentSection.sectionTitle} : {currentSection.channelTitle}{' '}
          </h3>
        )}
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
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.message}
              </ReactMarkdown>
            )}
            {name === message.name && (
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
                <DeleteButton
                  action={() => activeDelete(message.message, index)}
                />
              </div>
            )}
          </div>
        ))}
        <ModalWrapper
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          currentSection={currentSection}
          setMessage={setMessages}
        />
        <div ref={scrollRef}></div>
      </div>
    </div>
  );
};

export default ShowMessage;
