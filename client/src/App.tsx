import React from 'react';
import './App.css';
import { HandRaiseProvider } from './context/HandRaiseContext';
import HeaderNavbarDev from './components/common/HeaderNavbarDev/HeaderNavbarDev/HeaderNavbarDev';
import Navbar from './components/common/Navbar/Navbar';
import RaisedHandsList from './components/teacher/RaisedHandsList';
import InputMessage from './components/message/InputMessage/InputMessage';
import ShowMessage from './components/message/ShowMessage/ShowMessage';
import Modal from './components/message/modal/Modal';

function App() {
  function handleViewChange(view: string) {
    console.log(`Vue changée pour : ${view}`);
  }

  return (
    // <HandRaiseProvider>
    //   <div>
    //     <HeaderNavbarDev onViewChange={handleViewChange} />
    //     <Navbar />
    //     <RaisedHandsList />
    //   </div>
    // </HandRaiseProvider>
    <>
      <ShowMessage />
      <InputMessage />
    </>
  );
}

export default App;
