import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { Join } from './components/ButtonCreate';
import { RoomContext, RoomProvider } from './context/RoomContext';
import socket from "./services/webSocketService"

// const WS = "http://localhost:3000/";

function GlobalCall() {
  //const [mute, setMute] = useState(false);
  
  // useEffect(() => {
  //    const socket = io(WS);

  //   socket.on('connect', () => {
  //     console.log('Connected to WebSocket server');
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    createRoom()
   }, []);
 

     const {socket} = useContext(RoomContext)
     const createRoom = () => {
      socket.emit("create-room")
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

export default GlobalCall;
