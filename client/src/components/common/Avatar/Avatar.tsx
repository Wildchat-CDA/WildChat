import { useAvatar } from '../../../hooks/useAvatar';
import './Avatar.css';

interface AvatarProps {
  userId: string;
  firstName: string;
  lastName: string;
  size?: number;
  borderRadius?: number;
  backgroundColor?: string;
}

const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  userId,
  firstName,
  lastName,
  size = 40,
  borderRadius = 15,
  backgroundColor = '#4CAF50'
}) => {
  const { avatarUrl, isLoading, error } = useAvatar(userId);

  const avatarStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${borderRadius}px`,
    backgroundColor,
    fontSize: `${size * 0.4}px`,
  };

  if (isLoading) {
    return <div className="avatar avatar-loading" style={avatarStyle}></div>;
  }

  if (error || !avatarUrl) {
    return (
      <div className="avatar avatar-initials" style={avatarStyle}>
        {getInitials(firstName, lastName)}
      </div>
    );
  }

  return (
    <img 
      className="avatar avatar-image"
      src={avatarUrl} 
      alt={`Avatar of ${firstName} ${lastName}`} 
      style={avatarStyle}
    />
  );
};