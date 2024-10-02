import UserAvatar from '../UserAvatar/UserAvatar';
import MediaControls from '../MediaControl/MediaControl';
import './UserControl.css';


interface UserControlProps {
  userId: string;
  firstName: string;
  lastName: string;
  onSettingsClick: () => void;
  onChangeAvatar: () => void;
  onChangeAccount: () => void;
  onLogout: () => void;
}

function UserControl({
  userId,
  firstName,
  lastName,
  onSettingsClick,
  onChangeAvatar,
  onChangeAccount,
  onLogout
}: UserControlProps) {
  return (
    <div className="user-control">
      <div className="user-info">
        <UserAvatar 
          userId={userId}
          onChangeAvatar={onChangeAvatar}
          onChangeAccount={onChangeAccount}
          onLogout={onLogout}
        />
        <span className="user-name">{`${firstName} ${lastName}`}</span>
      </div>
      <div className="control-panel">
        <MediaControls userId={''} />
        <button onClick={onSettingsClick} className="settings-button">Settings</button>
      </div>
    </div>
  );
}

export default UserControl;