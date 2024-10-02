import { useState, useContext } from 'react';
import { useUserRole } from '../../../context/UserRoleContext';
import useHandRaise from '../../../hooks/useHandRaise';
import Logo from '../Logo';
import Dropdown from '../Dropdown/Dropdown';
import './Navbar.css';
import { ActiveSideBarType, useNavigation, ContentSideBarEnum } from '../../../context/NavigationContext';
import IconButton from '../../common/button/IconButton/IconButton';
import { MediaContext } from '../../../context/MediaContext';

interface NavbarProps {
  isMobile: boolean;
}

function Navbar({ isMobile }: NavbarProps) {
  const { userRole } = useUserRole();
  const { isHandRaised, raiseHand, lowerHand } = useHandRaise(1, 'Current User', 'Table-1');
  const [showHandRaiseDropdown, setShowHandRaiseDropdown] = useState(false);
  const [showMediaDropdown, setShowMediaDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const { setActiveContentMainComp, setActiveContentSide } = useNavigation();
  
  const mediaContext = useContext(MediaContext);
  if (!mediaContext) {
    throw new Error("Navbar must be used within a MediaProvider");
  }
  const { 
    isMicrophoneOn, 
    speakerVolume,
    toggleMicrophone, 
    setSpeakerVolume
  } = mediaContext;

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
      icon: 'icons/email.png', 
      text: 'Messages privés', 
      onClick: () => handleComponent(ContentSideBarEnum.PrivateMessage) 
    },
    { 
      icon: 'icons/listStudent.png', 
      text: 'Liste des mains levées', 
      onClick: () => handleComponent(ContentSideBarEnum.RaisedHand) 
    },
  ];

  const handleComponent = (contentEnum: ActiveSideBarType) => {
    setActiveContentSide(contentEnum);
    setActiveContentMainComp(false);
  };

  const renderNavItems = () => {
    if (userRole === 'teacher') {
      return (
        <>
          <IconButton
            icon='home.png'
            text='Accueil'
            onClick={() => handleComponent(ContentSideBarEnum.Home)}
            ariaLabel="Aller à l'accueil"
          />
            <IconButton
            icon='email.png'
            text='Message privée'
            onClick={() => handleComponent(ContentSideBarEnum.PrivateMessage)}
            ariaLabel="Voir les messages privés"
          />
          <IconButton
            icon='listStudent.png'
            text='Liste des présences'
            onClick={() => handleComponent(ContentSideBarEnum.PresenceList)}
            ariaLabel="Voir la liste des présences"
          />
           <IconButton
            icon='palm.png'
            text='Mains levées'
            onClick={() => handleComponent(ContentSideBarEnum.RaisedHand)}
            ariaLabel="Voir la liste des mains levées"
          />
          <IconButton
            icon={isMicrophoneOn ? 'speak.png' : 'NoSpeak.png'}
            text='Prendre la parole'
            onClick={toggleMicrophone}
            isActive={isMicrophoneOn}
            ariaLabel={isMicrophoneOn ? 'Couper le microphone' : 'Activer le microphone'}
          />

          <IconButton
            icon='add-new.png'
            text='Ajouter un élève'
            onClick={() => handleComponent(ContentSideBarEnum.AddStudent)}
            ariaLabel="Ajouter un élève"
          />

        </>
      );
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

      return (
        <>
          <IconButton
            icon='home.png'
            text='Accueil'
            onClick={() => handleComponent(ContentSideBarEnum.Home)}
            ariaLabel="Aller à l'accueil"
          />
          <IconButton
            icon='email.png'
            text='Messages privés'
            onClick={() => handleComponent(ContentSideBarEnum.PrivateMessage)}
            ariaLabel="Aller aux messages privés"
          />
          {isMobile && (
            <div className="nav-item">
              <IconButton icon='media.png' text='Média' onClick={toggleMediaDropdown} ariaLabel="Ouvrir les contrôles média" />
              {showMediaDropdown && (
                <Dropdown
                  items={mediaDropdownItems}
                  onClose={() => setShowMediaDropdown(false)}
                />
              )}
            </div>
          )}
          {handRaiseItem}
        </>
      );
    }
  };

  return (
    <nav className={`main-navbar ${isMobile ? 'mobile' : ''} ${userRole}`} aria-label="Navigation principale">
      {!isMobile && (
        <div className="logo-container">
          <Logo width={40} color='white' aria-hidden='true' />
          <span className="logo-text">Wild Chat</span>
        </div>
      )}
      <div className="nav-items-container">{renderNavItems()}</div>
    </nav>
  );
}

export default Navbar;


