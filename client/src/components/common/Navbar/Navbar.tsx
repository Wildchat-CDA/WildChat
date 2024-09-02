import React, { useState } from 'react';
import { useHandRaise } from '../../../context/HandRaiseContext';
import './Navbar.css';

function Navbar() {
  const { userHandState, toggleHandRaise } = useHandRaise();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    setIsDropdownOpen(function(prev) {
      return !prev;
    });
  }

  function handleToggleHandRaise(type: 'forSelf' | 'forTable') {
    toggleHandRaise(type);
    setIsDropdownOpen(false);
  }

  const isHandRaised = userHandState.forSelf || userHandState.forTable;

  return (
    <nav className="main-navbar">
      <div className="nav-item" onClick={toggleDropdown}>
        <img 
          src={`/icons/${isHandRaised ? 'prohibition.png' : 'palm.png'}`} 
          alt={isHandRaised ? "Baisser la main" : "Lever la main"} 
          className="nav-icon"
        />
        <span className="nav-text">{isHandRaised ? "Baisser la main" : "Lever la main"}</span>
      </div>
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
}

export default Navbar;