import './ContentMain.css';
import React from 'react';
import ShowMessage from '../message/ShowMessage/ShowMessage';
import InputMessage from '../message/InputMessage/InputMessage';

function ContentMain() {
  return (
    <main className='content-main'>
      <ShowMessage />
      <InputMessage />
      {/* Contenu principal ici */}
    </main>
  );
}

export default ContentMain;
