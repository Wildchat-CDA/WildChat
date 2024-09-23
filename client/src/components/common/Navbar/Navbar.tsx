import React, { useState } from 'react';
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
  muted: boolean;
  setMuted: (v: boolean) => void;
}

interface NavItemProps {
  icon: string;
  text: string;
  onClick: () => void;
  isActive?: boolean;
}

function NavItem({ icon, text, onClick, isActive }: NavItemProps) {
  return (
    <button
      className={`nav-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      aria-label={text}
      aria-pressed={isActive}
    >
      <div className='icon-wrapper'>
        <img
          src={`/icons/${icon}`}
          alt=''
          aria-hidden='true'
          className='nav-icon'
        />
      </div>
      <span className='nav-text'>{text}</span>
    </button>
  );
}

function Navbar({ isMobile, muted, setMuted }: NavbarProps) {
  const { userRole } = useUserRole();
  const { isHandRaised, raiseHand, lowerHand } = useHandRaise(
    1,
    'Current User',
    'Table-1'
  );
  const [showHandRaiseDropdown, setShowHandRaiseDropdown] = useState(false);
  const [showMediaDropdown, setShowMediaDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [isVolumeMuted, setIsVolumeMuted] = useState(false);
  const { activeContentSideBar, setActiveContentSide } = useNavigation();

  const handleMuted = () => {
    setMuted(!muted);
  };

  const toggleHandRaiseDropdown = () => {
    setShowHandRaiseDropdown(!showHandRaiseDropdown);
  };

  const toggleMediaDropdown = () => {
    setShowMediaDropdown(!showMediaDropdown);
  };

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const handleRaiseHand = (type: 'self' | 'table') => {
    if (isHandRaised[type]) {
      lowerHand(type);
    } else {
      raiseHand(type);
    }
    setShowHandRaiseDropdown(false);
  };

  const toggleVolume = () => {
    setIsVolumeMuted(!isVolumeMuted);
  };

  const handRaiseDropdownItems = [
    {
      icon: 'graduate-hat.png',
      text: 'Pour soi',
      onClick: () => handleRaiseHand('self'),
    },
    {
      icon: 'multiple-users-silhouette.png',
      text: 'Pour la table',
      onClick: () => handleRaiseHand('table'),
    },
  ];

  const mediaDropdownItems = [
    {
      icon: muted ? 'unmute.png' : 'microphone.png',
      text: 'Microphone',
      onClick: handleMuted,
    },
    {
      icon: isVolumeMuted ? 'mute.png' : 'volume.png',
      text: 'Volume',
      onClick: toggleVolume,
    },
    { icon: 'ecrou.png', text: 'Réglages', onClick: () => {} },
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
            <div className='nav-item'>
              <NavItem
                icon='notification.png'
                text='Notifications'
                onClick={toggleNotificationDropdown}
              />
              {showNotificationDropdown && (
                <Dropdown
                  items={notificationDropdownItems}
                  aria-label='Menu des notifications'
                />
              )}
            </div>
            <div className='nav-item'>
              <NavItem
                icon='media.png'
                text='Média'
                onClick={toggleMediaDropdown}
              />
              {showMediaDropdown && (
                <Dropdown
                  items={mediaDropdownItems}
                  aria-label='Menu des médias'
                />
              )}
            </div>
            <NavItem
              icon={muted ? 'NoSpeak.png' : 'speak.png'}
              text='Prendre la parole'
              onClick={handleMuted}
              isActive={!muted}
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
              onClick={handleMuted}
              isActive={!muted}
            />
          </>
        );
      }
    } else {
      const handRaiseItem = (
        <div className='hand-raise-container'>
          <NavItem
            icon='palm.png'
            text='Lever la main'
            onClick={toggleHandRaiseDropdown}
            isActive={isHandRaised.self || isHandRaised.table}
          />
          {showHandRaiseDropdown && (
            <Dropdown
              items={handRaiseDropdownItems}
              aria-label='Menu pour lever la main'
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
            <div className='nav-item'>
              <NavItem
                icon='media.png'
                text='Média'
                onClick={toggleMediaDropdown}
              />
              {showMediaDropdown && (
                <Dropdown
                  items={mediaDropdownItems}
                  aria-label='Menu des médias'
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
    <nav
      className={`main-navbar ${isMobile ? 'mobile' : ''} ${userRole}`}
      aria-label='Navigation principale'
    >
      {!isMobile && (
        <div className='logo-container'>
          <Logo width={40} color='white' aria-hidden='true' />
          <span className='logo-text'>Wild Chat</span>
        </div>
      )}
      <div className='nav-items-container'>{renderNavItems()}</div>
    </nav>
  );
}

export default Navbar;
