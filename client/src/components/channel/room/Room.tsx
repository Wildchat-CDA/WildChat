import React, { useState } from 'react';
import './Room.css';
import { useActiveChannel } from '../../../context/ChannelContext';

function Room({ rooms }) {
  console.log('ROOMS : ', rooms);
  const { setCurrentChannel, currentChannel } = useActiveChannel();
  console.log('current : ', currentChannel);

  return (
    <div className='rooms-container'>
      {rooms.map((room) => {
        console.log('room :', room);
        return (
          <div>
            <span
              className='room-span'
              onClick={() => setCurrentChannel(room.uuid)}
            >
              {room.title}{' '}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Room;
