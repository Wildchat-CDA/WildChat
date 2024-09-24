import { useState, useContext } from 'react';
import { useUserRole } from '../../../context/UserRoleContext';
import useHandRaise from '../../../hooks/useHandRaise';
import Logo from '../Logo';
import Dropdown from '../Dropdown/Dropdown';
import './Navbar.css';
import { useNavigation } from '../../../context/NavigationContext';
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
  const navigation = useNavigation();
  
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
    { icon: 'icons/email.png', text: 'Messages privés', onClick: () => {} },
    { icon: 'icons/listStudent.png', text: 'Liste des mains levées', onClick: () => {} },
  ];

  const handleNavigation = (type: string) => {
    switch (type) {
      case 'accueil':
        navigation.goToHome();
        break;
      case 'messagesPrives':
        navigation.goToPrivateMessages();
        break;
      case 'listePresences':
        navigation.goToAttendanceList();
        break;
      case 'elevesConnectes':
        navigation.goToConnectedStudents();
        break;
      case 'mainsLevees':
        navigation.goToRaisedHands();
        break;
      default:
        break;
    }
  };

  const renderNavItems = () => {
    if (userRole === 'teacher') {
      if (isMobile) {
        return (
          <>
            <IconButton 
              icon='home.png' 
              text='Accueil' 
              onClick={() => handleNavigation('accueil')} 
              ariaLabel="Aller à l'accueil"
            />
            <IconButton 
              icon='email.png' 
              text='Messages privés' 
              onClick={() => handleNavigation('messagesPrives')} 
              ariaLabel="Aller aux messages privés"
            />
            <IconButton 
              icon='listStudent.png' 
              text='Liste des présences' 
              onClick={() => handleNavigation('listePresences')} 
              ariaLabel="Voir la liste des présences"
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
            <IconButton 
              icon='home.png' 
              text='Accueil' 
              onClick={() => handleNavigation('accueil')} 
              ariaLabel="Aller à l'accueil"
            />
            <IconButton 
              icon='email.png' 
              text='Messages privés' 
              onClick={() => handleNavigation('messagesPrives')} 
              ariaLabel="Aller aux messages privés"
            />
            <IconButton 
              icon='listStudent.png' 
              text='Élèves connectés' 
              onClick={() => handleNavigation('elevesConnectes')} 
              ariaLabel="Voir les élèves connectés"
            />
            <IconButton 
              icon='palm.png' 
              text='Mains levées' 
              onClick={() => handleNavigation('mainsLevees')} 
              ariaLabel="Voir les mains levées"
            />
            <IconButton
              icon={isMicrophoneOn ? 'speak.png' : 'NoSpeak.png'}
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
            <IconButton 
              icon='home.png' 
              text='Accueil' 
              onClick={() => handleNavigation('accueil')} 
              ariaLabel="Aller à l'accueil"
            />
            <IconButton 
              icon='email.png' 
              text='Messages privés' 
              onClick={() => handleNavigation('messagesPrives')} 
              ariaLabel="Aller aux messages privés"
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
            <IconButton 
              icon='home.png' 
              text='Accueil' 
              onClick={() => handleNavigation('accueil')} 
              ariaLabel="Aller à l'accueil"
            />
            <IconButton 
              icon='email.png' 
              text='Messages privés' 
              onClick={() => handleNavigation('messagesPrives')} 
              ariaLabel="Aller aux messages privés"
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