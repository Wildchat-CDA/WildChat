import { useCallback, useContext } from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import { MediaContext } from '../../../context/MediaContext';
import IconButton from '../../common/button/IconButton/IconButton';
import Tooltip from '../Tooltip/Tooltip';
import './MediaControl.css';

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
        <Tooltip content={isMicrophoneOn ? 'Désactiver le microphone' : 'Activer le microphone'}>
          <div className="media-control-icon">
            <IconButton
              icon={isMicrophoneOn ? 'microphone-on.png' : 'microphone-off.png'}
              onClick={toggleMicrophone}
              ariaLabel={isMicrophoneOn ? 'Désactiver le microphone' : 'Activer le microphone'}
              text={isMicrophoneOn ? 'Désactiver le microphone' : 'Activer le microphone'}
            />
          </div>
        </Tooltip>
        <Tooltip content={isWebcamOn ? 'Désactiver la caméra' : 'Activer la caméra'}>
          <div className="media-control-icon">
            <IconButton
              icon={isWebcamOn ? 'webcam-on.png' : 'webcam-off.png'}
              onClick={toggleWebcam}
              ariaLabel={isWebcamOn ? 'Désactiver la caméra' : 'Activer la caméra'}
              text={isWebcamOn ? 'Désactiver la caméra' : 'Activer la caméra'}
            />
          </div>
        </Tooltip>
        <Tooltip content={isSpeakerOn ? 'Couper le son' : 'Activer le son'}>
          <div className="media-control-icon">
            <IconButton
              icon={isSpeakerOn ? 'speaker-on.png' : 'speaker-off.png'}
              onClick={toggleSpeaker}
              ariaLabel={isSpeakerOn ? 'Couper le son' : 'Activer le son'}
              text={isSpeakerOn ? 'Couper le son' : 'Activer le son'}
            />
          </div>
        </Tooltip>
        <Tooltip content={isScreenSharing ? 'Arrêter le partage d\'écran' : 'Démarrer le partage d\'écran'}>
          <div className="media-control-icon">
            <IconButton
              icon={isScreenSharing ? 'screen-share-on.png' : 'screen-share-off.png'}
              onClick={toggleScreenSharing}
              ariaLabel={isScreenSharing ? 'Arrêter le partage d\'écran' : 'Démarrer le partage d\'écran'}
              text={isScreenSharing ? 'Arrêter le partage d\'écran' : 'Démarrer le partage d\'écran'}
            />
          </div>
        </Tooltip>
        <Tooltip content="Afficher les réglages">
          <div className="media-control-icon">
            <IconButton
              icon="settings.png"
              onClick={() => {/* Logique pour ouvrir les réglages */}}
              ariaLabel="Afficher les réglages"
              text="Afficher les réglages"
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default MediaControl;