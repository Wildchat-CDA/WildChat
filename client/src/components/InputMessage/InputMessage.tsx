import React, { useState } from 'react';
import { handleEnterKey } from '../../services/eventHandlerService';

const InputMessage = (props) => {
  const [input, setInput] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Message envoyé');
    setInput('');
    console.log('input : ', input);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleEnterKey(e, onSubmit)}
        ></textarea>
        <button>envoyer</button>
      </form>
    </div>
  );
};

export default InputMessage;
