import ShowMessage from '../../components/message/ShowMessage/ShowMessage';
import InputMessage from '../../components/message/InputMessage/InputMessage';
import './ChatPage.css';

const ChatPage = () => {
  return (
    <div className='chat-page'>
      <ShowMessage />
      <InputMessage />
    </div>
  );
};

export default ChatPage;
