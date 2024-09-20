import { Avatar } from '../Avatar/Avatar';
import { MicrophoneControl } from '../AudioControls/MicrophoneControl';
import { VolumeControl } from '../AudioControls/VolumeControl';
import { SettingsButton } from '../SettingsButton/SettingsButton';
import { useAudioContext } from '../../../hooks/useAudioContext';
import './UserControl.css';

interface UserControlProps {
  userId: string;
  firstName: string;
  lastName: string;
  onSettingsClick: () => void;
}

export const UserControl: React.FC<UserControlProps> = ({
  userId,
  firstName,
  lastName,
  onSettingsClick
}) => {
  const { isMuted, toggleMute, volume, setVolume } = useAudioContext();

  return (
    <div className="user-control">
      <div className="user-info">
        <Avatar userId={userId} firstName={firstName} lastName={lastName} size={40} />
        <span className="user-name">{`${firstName} ${lastName}`}</span>
      </div>
      <div className="control-panel">
        <MicrophoneControl isMuted={isMuted} toggleMute={toggleMute} />
        <VolumeControl volume={volume} setVolume={setVolume} />
        <SettingsButton onClick={onSettingsClick} />
      </div>
    </div>
  );
};
