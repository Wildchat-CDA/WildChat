import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import ButtonHP from './components/ButtonHP';
import { Join } from './components/ButtonCreate';
import { RoomContext } from './context/RoomContext';

const WS = "http://localhost:3000/";

function App() {
  const [mute, setMute] = useState(false);
  
  useEffect(() => {
    const socket = io(WS);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    createRoom()
    console.log("hehetdgdgd")
   }, []);
 

     const {ws} = useContext(RoomContext)
     const createRoom = () => {
         ws.emit("create-room")
     }

  return (
    <>
      <div>
        <button>new call</button>
        <Join/>
      </div>
    </>
  );
}

export default App;
