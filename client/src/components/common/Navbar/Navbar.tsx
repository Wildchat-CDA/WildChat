import React, { useState } from 'react';
import { useHandRaise } from '../../../context/HandRaiseContext';
import './Navbar.css';
import Logo from '../Logo';

const NavItem = ({ icon, text, onClick, isActive }) => (
  <div className={`nav-item ${isActive ? 'active' : ''}`} onClick={onClick}>
    <div className="icon-wrapper">
      <img src={`/icons/${icon}`} alt={text} className="nav-icon" />
    </div>
    <span className="nav-text">{text}</span>
  </div>
);

const Navbar = () => {
  const { userHandState, toggleHandRaise } = useHandRaise();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleToggleHandRaise = (type: 'forSelf' | 'forTable') => {
    toggleHandRaise(type);
    setIsDropdownOpen(false);
  };

  const isHandRaised = userHandState.forSelf || userHandState.forTable;

  return (
    <nav className="main-navbar">
      <div className="logo-container">
        <Logo width={40} color="white" />
        <span className="logo-text">Wild Chat</span>
      </div>
      <NavItem 
        icon={isHandRaised ? 'prohibition.png' : 'palm.png'}
        text={isHandRaised ? "Baisser la main" : "Lever la main"}
        onClick={toggleDropdown}
        isActive={isHandRaised}
      />
      {isDropdownOpen && (
        <div className="dropdown">
          <div className="dropdown-item" onClick={() => handleToggleHandRaise('forSelf')}>
            <img src="/icons/graduate-hat.png" alt="Pour soi" className="dropdown-icon" />
            <span>Pour soi</span>
            {userHandState.forSelf && <span className="status-indicator">✓</span>}
          </div>
          <div className="dropdown-item" onClick={() => handleToggleHandRaise('forTable')}>
            <img src="/icons/multiple-users-silhouette.png" alt="Pour la table" className="dropdown-icon" />
            <span>Pour la table</span>
            {userHandState.forTable && <span className="status-indicator">✓</span>}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;