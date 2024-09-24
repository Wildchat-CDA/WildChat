import { useState, useContext } from 'react';
import { useUserRole } from '../../../context/UserRoleContext';
import useHandRaise from '../../../hooks/useHandRaise';
import Logo from '../Logo';
import Dropdown from '../Dropdown/Dropdown';
import './Navbar.css';
import {
  ActiveSideBarType,
  useNavigation,
} from '../../../context/NavigationContext';
import { ContentSideBarEnum } from '../../../context/NavigationContext';

interface NavbarProps {
  isMobile: boolean;
}

function Navbar({ isMobile }: NavbarProps) {
  const { userRole } = useUserRole();
  const { isHandRaised, raiseHand, lowerHand } = useHandRaise(1, 'Current User', 'Table-1');
  const [showHandRaiseDropdown, setShowHandRaiseDropdown] = useState(false);
  const [showMediaDropdown, setShowMediaDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [isVolumeMuted, setIsVolumeMuted] = useState(false);
  const { setActiveContentMainComp, setActiveContentSide } = useNavigation();

  const handleMuted = () => {
    setMuted(!muted);
  };

  const toggleHandRaiseDropdown = () => setShowHandRaiseDropdown(!showHandRaiseDropdown);
  const toggleMediaDropdown = () => setShowMediaDropdown(!showMediaDropdown);
  const toggleNotificationDropdown = () => setShowNotificationDropdown(!showNotificationDropdown);

  const handleRaiseHand = (type: 'self' | 'table') => {
    if (isHandRaised[type]) {
      lowerHand(type);
    } else {
      raiseHand(type);
    }
    setShowHandRaiseDropdown(false);
  };

  const toggleSpeaker = () => setSpeakerVolume(speakerVolume > 0 ? 0 : 1);
  const isSpeakerOn = speakerVolume > 0;

  const handRaiseDropdownItems = [
    { icon: 'icons/graduate-hat.png', text: 'Pour soi', onClick: () => handleRaiseHand('self') },
    { icon: 'icons/multiple-users-silhouette.png', text: 'Pour la table', onClick: () => handleRaiseHand('table') },
  ];

  const mediaDropdownItems = [
    {
      icon: `icons/${isMicrophoneOn ? 'microphone.png' : 'unmute.png'}`,
      text: 'Microphone',
      onClick: toggleMicrophone,
    },
    {
      icon: `icons/${isSpeakerOn ? 'volume.png' : 'mute.png'}`,
      text: 'Volume',
      onClick: toggleSpeaker,
    },
    { icon: 'icons/ecrou.png', text: 'Réglages', onClick: () => {} },
  ];

  const notificationDropdownItems = [
    {
      icon: 'message.png',
      text: 'Messages privés',
      onClick: () => handleComponent(ContentSideBarEnum.PrivateMessage),
    },
    {
      icon: 'list.png',
      text: 'Liste des mains levées',
      onClick: () => handleComponent(ContentSideBarEnum.RaisedHand),
    },
  ];

  const handleComponent = (contentEnum: ActiveSideBarType) => {
    setActiveContentSide(contentEnum);
    setActiveContentMainComp(false);
  };

  const renderNavItems = () => {
    if (userRole === 'teacher') {
      if (isMobile) {
        return (
          <>
            <NavItem
              icon='home.png'
              text='Accueil'
              onClick={() => handleComponent(ContentSideBarEnum.Home)}
            />
            <NavItem
              icon='listStudent.png'
              text='Liste des présences'
              onClick={() => handleComponent(ContentSideBarEnum.PresenceList)}
            />
            <div className="nav-item">
              <IconButton icon='notification.png' text='Notifications' onClick={toggleNotificationDropdown} ariaLabel="Ouvrir les notifications" />
              {showNotificationDropdown && (
                <Dropdown 
                  items={notificationDropdownItems} 
                  onClose={() => setShowNotificationDropdown(false)} 
                />
              )}
            </div>
            <div className="nav-item">
              <IconButton icon='media.png' text='Média' onClick={toggleMediaDropdown} ariaLabel="Ouvrir les contrôles média" />
              {showMediaDropdown && (
                <Dropdown 
                  items={mediaDropdownItems} 
                  onClose={() => setShowMediaDropdown(false)} 
                />
              )}
            </div>
            <IconButton
              icon={isMicrophoneOn ? 'speak.png' : 'NoSpeak.png'}
              text='Prendre la parole'
              onClick={toggleMicrophone}
              isActive={isMicrophoneOn}
              ariaLabel={isMicrophoneOn ? 'Couper le microphone' : 'Activer le microphone'}
            />
          </>
        );
      } else {
        return (
          <>
            <NavItem
              icon='home.png'
              text='Accueil'
              onClick={() => {
                handleComponent(ContentSideBarEnum.Home);
              }}
            />
            <NavItem
              icon='email.png'
              text='Messages privés'
              onClick={() => handleComponent(ContentSideBarEnum.PrivateMessage)}
            />
            <NavItem
              icon='listStudent.png'
              text='Élèves connectés'
              onClick={() => handleComponent(ContentSideBarEnum.PresenceList)}
            />
            <NavItem
              icon='palm.png'
              text='Mains levées'
              onClick={() => {
                handleComponent(ContentSideBarEnum.RaisedHand);
              }}
            />
            <NavItem
              icon={muted ? 'NoSpeak.png' : 'speak.png'}
              text='Prendre la parole'
              onClick={toggleMicrophone}
              isActive={isMicrophoneOn}
              ariaLabel={isMicrophoneOn ? 'Couper le microphone' : 'Activer le microphone'}
            />
          </>
        );
      }
    } else {
      const handRaiseItem = (
        <div className="hand-raise-container">
          <IconButton
            icon='palm.png'
            text='Lever la main'
            onClick={toggleHandRaiseDropdown}
            isActive={isHandRaised.self || isHandRaised.table}
            ariaLabel='Lever la main'
          />
          {showHandRaiseDropdown && (
            <Dropdown 
              items={handRaiseDropdownItems} 
              onClose={() => setShowHandRaiseDropdown(false)} 
            />
          )}
        </div>
      );

      if (isMobile) {
        return (
          <>
            <NavItem
              icon='home.png'
              text='Accueil'
              onClick={() => handleComponent(ContentSideBarEnum.Home)}
            />
            <NavItem
              icon='email.png'
              text='Messages privés'
              onClick={() => handleComponent(ContentSideBarEnum.PrivateMessage)}
            />
            <div className="nav-item">
              <IconButton icon='media.png' text='Média' onClick={toggleMediaDropdown} ariaLabel="Ouvrir les contrôles média" />
              {showMediaDropdown && (
                <Dropdown 
                  items={mediaDropdownItems} 
                  onClose={() => setShowMediaDropdown(false)} 
                />
              )}
            </div>
            {handRaiseItem}
          </>
        );
      } else {
        return (
          <>
            <NavItem
              icon='home.png'
              text='Accueil'
              onClick={() => handleComponent(ContentSideBarEnum.Home)}
            />
            <NavItem
              icon='email.png'
              text='Messages privés'
              onClick={() => handleComponent(ContentSideBarEnum.PrivateMessage)}
            />
            {handRaiseItem}
          </>
        );
      }
    }
  };

  return (
    <nav className={`main-navbar ${isMobile ? 'mobile' : ''} ${userRole}`} aria-label="Navigation principale">
      {!isMobile && (
        <div className="logo-container">
          <Logo width={40} color='white' aria-hidden='true' />
          <span className="logo-text">MyApp</span>
        </div>
      )}
      <div className="nav-items-container">{renderNavItems()}</div>
    </nav>
  );
}

export default Navbar;