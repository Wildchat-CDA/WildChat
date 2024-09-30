import UserAvatar from '../../components/common/UserAvatar/UserAvatar';
import MediaControl from '../common/MediaControl/MediaControl';
import './UserControlSettings.css';

interface UserControlSettingsProps {
  userId: string;
  onSettingsClick: () => void;
  onChangeAvatar: () => void;
  onChangeAccount: () => void;
  onLogout: () => void;
}

function UserControlSettings({
  userId,
  onSettingsClick,
  onChangeAvatar,
  onChangeAccount,
  onLogout
}: UserControlSettingsProps) {
  return (
    <div className="user-control-settings">
      <div className="user-info">
        <UserAvatar 
          userId={userId}
          onChangeAvatar={onChangeAvatar}
          onChangeAccount={onChangeAccount}
          onLogout={onLogout}
        />
      </div>
      <div className="control-panel">
        <MediaControl userId={userId} />
      </div>
    </div>
  );
}

export default UserControlSettings;