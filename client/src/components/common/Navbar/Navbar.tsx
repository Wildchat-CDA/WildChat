import React, { useState } from 'react';
import { useUserRole } from '../../../context/UserRoleContext';
import { useHandRaise } from '../../../context/HandRaiseContext';
import Logo from '../Logo';
import Dropdown from '../Dropdown/Dropdown';
import './Navbar.css';

interface NavbarProps {
  isMobile: boolean;
}

interface NavItemProps {
  icon: string;
  text: string;
  onClick: () => void;
  isActive?: boolean;
}

function NavItem({ icon, text, onClick, isActive }: NavItemProps) {
  return (
    <div className={`nav-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="icon-wrapper">
        <img src={`/icons/${icon}`} alt={text} className="nav-icon" />
      </div>
      <span className="nav-text">{text}</span>
    </div>
  );
}

function Navbar({ isMobile }: NavbarProps) {
  const { userRole } = useUserRole();
  const { userHandState, toggleHandRaise } = useHandRaise();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleRaiseHand = (type: 'forSelf' | 'forTable') => {
    toggleHandRaise(type);
    setShowDropdown(false);
  };

  const dropdownItems = [
    { icon: 'graduate-hat.png', text: 'Pour soi', onClick: () => handleRaiseHand('forSelf') },
    { icon: 'multiple-users-silhouette.png', text: 'Pour la table', onClick: () => handleRaiseHand('forTable') }
  ];

  const renderNavItems = () => {
    if (userRole === 'teacher') {
      if (isMobile) {
        return (
          <>
            <NavItem icon="navigation.png" text="Navigation" onClick={() => {/* ... */}} />
            <NavItem icon="notification.png" text="Notifications" onClick={() => {/* ... */}} />
            <NavItem icon="media.png" text="Média" onClick={() => {/* ... */}} />
            <NavItem icon="speak.png" text="Prendre la parole" onClick={() => {/* ... */}} />
          </>
        );
      } else {
        return (
          <>
            <NavItem icon="home.png" text="Accueil" onClick={() => {/* ... */}} />
            <NavItem icon="email.png" text="Messages privés" onClick={() => {/* ... */}} />
            <NavItem icon="students.png" text="Élèves connectés" onClick={() => {/* ... */}} />
            <NavItem icon="palm.png" text="Mains levées" onClick={() => {/* ... */}} />
            <NavItem icon="speak.png" text="Prendre la parole" onClick={() => {/* ... */}} />
          </>
        );
      }
    } else { // student
      const handRaiseItem = (
        <div className="hand-raise-container">
          <NavItem
            icon="palm.png"
            text="Lever la main"
            onClick={toggleDropdown}
            isActive={userHandState.forSelf || userHandState.forTable}
          />
          {showDropdown && <Dropdown items={dropdownItems} />}
        </div>
      );

      if (isMobile) {
        return (
          <>
            <NavItem icon="library.png" text="Bibliothèque" onClick={() => {/* ... */}} />
            <NavItem icon="channels.png" text="Canaux" onClick={() => {/* ... */}} />
            <NavItem icon="email.png" text="Messages privés" onClick={() => {/* ... */}} />
            <NavItem icon="media.png" text="Média" onClick={() => {/* ... */}} />
            {handRaiseItem}
          </>
        );
      } else {
        return (
          <>
            <NavItem icon="home.png" text="Accueil" onClick={() => {/* ... */}} />
            <NavItem icon="email.png" text="Messages privés" onClick={() => {/* ... */}} />
            {handRaiseItem}
          </>
        );
      }
    }
  };

  return (
    <nav className={`main-navbar ${isMobile ? 'mobile' : ''} ${userRole}`}>
      {!isMobile && (
        <div className="logo-container">
          <Logo width={40} color="white" />
          <span className="logo-text">Wild Chat</span>
        </div>
      )}
      {renderNavItems()}
    </nav>
  );
}

export default Navbar;