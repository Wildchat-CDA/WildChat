import { useState, useRef, useEffect } from 'react';
import { handleKeyDown } from '../../../services/eventHandlerService';
import { webSocketService } from '../../../services/webSocketService';
import './InputMessage.css';
import '../../../App.css';
import { useNavigation } from '../../../context/NavigationContext';
// import { useAuth } from '../../../context/AuthentificationContext';
import { useUserRole } from '../../../context/UserRoleContext';

const InputMessage = () => {
  const [input, setInput] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { userInfos } = useUserRole();
  const { currentSection } = useNavigation();

  const firstname = userInfos.firstname;

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
    if (input.trim()) {
      const payload = {
        name: firstname,
        message: input,
        roomId: currentSection?.uuid || '',
      };
      webSocketService.emit('message', payload);
      setInput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustHeight();
  };

  return (
    <div className='input-message-container'>
      <form onSubmit={onSubmit} className='form-container'>
        <label htmlFor='messageInput' className='visually-hidden'>
          Message
        </label>
        <textarea
          id='messageInput'
          ref={textAreaRef}
          className='input-message'
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => handleKeyDown(e, onSubmit, () => setInput(''))}
          placeholder='Envoyer un message'
        />
      </form>
    </div>
  );
};

export default InputMessage;
