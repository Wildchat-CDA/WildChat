import React, { useState, useCallback, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [handRaiseState, setHandRaiseState] = useState({
    forSelf: false,
    forTable: false
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    console.log('Navbar rendered');
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const toggleHandRaise = useCallback((type) => {
    setHandRaiseState(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    setIsDropdownOpen(false);
  }, []);

  const isHandRaised = handRaiseState.forSelf || handRaiseState.forTable;

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
          <div className="dropdown-item" onClick={() => toggleHandRaise('forSelf')}>
            <img src="/icons/graduate-hat.png" alt="Pour soi" className="dropdown-icon" />
            <span>Pour soi</span>
            {handRaiseState.forSelf && <span className="status-indicator">✓</span>}
          </div>
          <div className="dropdown-item" onClick={() => toggleHandRaise('forTable')}>
            <img src="/icons/multiple-users-silhouette.png" alt="Pour la table" className="dropdown-icon" />
            <span>Pour la table</span>
            {handRaiseState.forTable && <span className="status-indicator">✓</span>}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;