import React, { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import ButtonHP from './components/ButtonHP';
import { Join } from './components/ButtonCreate';

const WS = "http://localhost:3000";

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

  return (
    <>
      <div>
        <ButtonHP mute={mute} setMute={setMute} />
      </div>
      <div>
        <button>new call</button>
        <Join/>
      </div>
    </>
  );
}

export default App;
