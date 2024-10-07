import { useContext, useState } from 'react';
import { MediaContext } from '../../../context/MediaContext';
import IconButton from '../button/IconButton/IconButton';
import './mediaControl.css';

interface MediaControlProps {
  userId: string;
}

function MediaControl({ userId }: MediaControlProps) {
  const mediaContext = useContext(MediaContext);

  if (!mediaContext) {
    throw new Error('MediaControl must be used within MediaProvider');
  }

  const {
    isMicrophoneOn,
    toggleMicrophone,
    speakerVolume,
    setSpeakerVolume,
    isCalling,
    toggleCall,

  } = mediaContext;

  const toggleSpeaker = () => {
    setSpeakerVolume(speakerVolume > 0 ? 0 : 1);
  };

  const isSpeakerOn = speakerVolume > 0;

  const handleCall = () => {
    toggleCall(false);
  };

  return (
    <div className='media-control'>
      <div className='media-buttons'>
        <IconButton
          icon={isMicrophoneOn ? 'microphone.png' : 'unmute.png'}
          text={
            isMicrophoneOn
              ? 'Désactiver le microphone'
              : 'Activer le microphone'
          }
          onClick={toggleMicrophone}
          ariaLabel={
            isMicrophoneOn
              ? 'Désactiver le microphone'
              : 'Activer le microphone'
          }
        />
        <IconButton
          icon={isSpeakerOn ? 'volume.png' : 'mute.png'}
          text={isSpeakerOn ? 'Couper le son' : 'Activer le son'}
          onClick={toggleSpeaker}
          ariaLabel={isSpeakerOn ? 'Couper le son' : 'Activer le son'}
        />
        <IconButton
          icon='ecrou.png'
          text='Réglages'
          onClick={() => {
            /* Logique pour ouvrir les réglages */
          }}
          ariaLabel='Ouvrir les réglages'
        />
        {isCalling && (
          <IconButton
            icon='raccrocher.png'
            text='Quitter le salon vocal'
            onClick={handleCall}
            ariaLabel='Quitter le salon vocal'
          />
        )}
      </div>
    </div>
  );
}

export default MediaControl;
