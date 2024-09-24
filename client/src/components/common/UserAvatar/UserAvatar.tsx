import { useState, useMemo } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { useAvatar } from '../../../hooks/useAvatar';

interface UserAvatarProps {
  userId: string;
  onChangeAvatar: () => void;
  onChangeAccount: () => void;
  onLogout: () => void;
}

function UserAvatar({
  userId,
  onChangeAvatar,
  onChangeAccount,
  onLogout,
}: UserAvatarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { avatarUrl, firstName, lastName, isLoading, error } = useAvatar(userId);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const dropdownItems = useMemo(() => [
    {
      icon: 'change-avatar.png',
      text: 'Changer d\'avatar',
      onClick: onChangeAvatar,
    },
    {
      icon: 'switch-account.png',
      text: 'Changer de compte',
      onClick: onChangeAccount,
    },
    {
      icon: 'logout.png',
      text: 'Déconnexion',
      onClick: onLogout,
    },
  ], [onChangeAvatar, onChangeAccount, onLogout]);

  const renderAvatar = () => {
    if (isLoading) {
      return <div className="avatar-placeholder">Chargement...</div>;
    }
    return (
      <img
        src={avatarUrl || "/icons/avatar.png"}
        alt={`Avatar de ${firstName} ${lastName}`}
        className={`user-avatar ${error ? 'default-avatar' : ''}`}
      />
    );
  };

  return (
    <div className="user-avatar-container">
      <button
        className="user-avatar-button"
        onClick={toggleDropdown}
        aria-label="Menu utilisateur"
        aria-expanded={showDropdown}
      >
        {renderAvatar()}
        <span className="user-name">{isLoading ? 'Chargement...' : `${firstName} ${lastName}`}</span>
      </button>
      {showDropdown && (
        <Dropdown
          items={dropdownItems}
          aria-label="Options utilisateur"
          onClose={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}

export default UserAvatar;