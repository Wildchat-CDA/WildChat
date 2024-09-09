import React, { useState } from 'react';
import './Room.css';

function Room({ rooms }) {
  console.log('ROOMS : ', rooms);

  return (
    <div className='rooms-container'>
      {rooms.map((room) => {
        return (
          <div>
            <span className='room-span'>{room.title} </span>
          </div>
        );
      })}
    </div>
  );
}

export default Room;
