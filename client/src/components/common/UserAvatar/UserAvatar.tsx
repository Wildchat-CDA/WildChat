import { useState, useMemo } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { useAvatar } from '../../../hooks/useAvatar';
import { useNavigate } from 'react-router-dom';
import './userAvatar.css';
import Cookies from 'js-cookie';

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
}: UserAvatarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { avatarUrl, firstName, lastName, isLoading, error } =
    useAvatar(userId);
  const cookie = JSON.parse(Cookies.get('token') as string);

  const navigate = useNavigate();

  const firstname = cookie.userInfo.firstname;

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const onLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  const dropdownItems = useMemo(
    () => [
      {
        icon: 'icons/change-avatar.png',
        text: "Changer d'avatar",
        onClick: onChangeAvatar,
      },
      {
        icon: 'icons/switch-account.png',
        text: 'Changer de compte',
        onClick: onChangeAccount,
      },
      {
        icon: 'icons/logout.png',
        text: 'Deconnexion',
        onClick: onLogout,
      },
    ],
    [onChangeAvatar, onChangeAccount, navigate]
  );

  const renderAvatar = () => {
    if (isLoading) {
      return <div className='avatar-placeholder'>Chargement...</div>;
    }
    return (
      <img
        src={avatarUrl || '/icons/avatar.png'}
        // alt={`Avatar de ${firstName} ${lastName}`}
        alt={`Avatar de  ${firstname}`}
        className={`user-avatar ${error ? 'default-avatar' : ''}`}
        width='40'
        height='40'
      />
    );
  };

  return (
    <div className='user-avatar-container'>
      <button
        className='user-avatar-button'
        onClick={toggleDropdown}
        aria-label='Menu utilisateur'
        aria-expanded={showDropdown}
      >
        {renderAvatar()}
        <span className='user-name'>
          {/* {isLoading ? 'Chargement...' : `${firstName} ${lastName}`} */}
          {isLoading ? 'Chargement...' : ` ${firstname}`}
        </span>
      </button>
      {showDropdown && (
        <div className='dropdown-avatar-menu'>
          <Dropdown
            items={dropdownItems}
            aria-label='Options utilisateur'
            onClose={() => setShowDropdown(false)}
          />
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
