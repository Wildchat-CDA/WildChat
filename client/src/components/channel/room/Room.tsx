import React from 'react';
import './Room.css';
import { ISectionChannel } from '../../../types/sectionTypes';

function Room({ rooms, setCurrentSection }) {
  const handleRoom = (room) => {
    setCurrentSection((prevState: ISectionChannel) => ({
      ...prevState,
      channelTitle: room.title,
      uuid: room.uuid,
    }));
  };

  return (
    <div className='rooms-container'>
      {rooms.map((room) => {
        console.log('room :', room);
        return (
          <div>
            <span className='room-span' onClick={() => handleRoom(room)}>
              {room.title}{' '}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Room;
