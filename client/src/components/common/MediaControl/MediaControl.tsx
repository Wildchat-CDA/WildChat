import { useCallback, useContext } from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import { MediaContext } from '../../../context/MediaContext';
import IconButton from '../../common/button/IconButton/IconButton';

interface MediaControlProps {
  userId: string;
}

function MediaControl({ userId }: MediaControlProps) {
  const context = useContext(MediaContext);

  if (!context) {
    throw new Error("MediaControl must be used within a MediaProvider");
  }

  const { 
    isMicrophoneOn, 
    isWebcamOn,
    isScreenSharing,
    speakerVolume,
    toggleMicrophone, 
    toggleWebcam,
    toggleScreenSharing,
    setSpeakerVolume
  } = context;

  const handleChangeAvatar = useCallback(() => {
    // Logique pour changer l'avatar
  }, []);

  const handleChangeAccount = useCallback(() => {
    // Logique pour changer de compte
  }, []);

  const handleLogout = useCallback(() => {
    // Logique de déconnexion
  }, []);

  const toggleSpeaker = () => {
    setSpeakerVolume(speakerVolume > 0 ? 0 : 1);
  };

  const isSpeakerOn = speakerVolume > 0;

  return (
    <div className="media-control">
      <UserAvatar 
        userId={userId}
        onChangeAvatar={handleChangeAvatar}
        onChangeAccount={handleChangeAccount}
        onLogout={handleLogout}
      />
      <div className="media-buttons">
        <IconButton
          icon={isMicrophoneOn ? 'microphone-on.png' : 'microphone-off.png'}
          onClick={toggleMicrophone}
          ariaLabel={isMicrophoneOn ? 'Mute microphone' : 'Unmute microphone'}
        />
        <IconButton
          icon={isWebcamOn ? 'webcam-on.png' : 'webcam-off.png'}
          onClick={toggleWebcam}
          ariaLabel={isWebcamOn ? 'Turn off webcam' : 'Turn on webcam'}
        />
        <IconButton
          icon={isSpeakerOn ? 'speaker-on.png' : 'speaker-off.png'}
          onClick={toggleSpeaker}
          ariaLabel={isSpeakerOn ? 'Mute speaker' : 'Unmute speaker'}
        />
        <IconButton
          icon={isScreenSharing ? 'screen-share-on.png' : 'screen-share-off.png'}
          onClick={toggleScreenSharing}
          ariaLabel={isScreenSharing ? 'Stop screen sharing' : 'Start screen sharing'}
        />
      </div>
    </div>
  );
}

export default MediaControl;