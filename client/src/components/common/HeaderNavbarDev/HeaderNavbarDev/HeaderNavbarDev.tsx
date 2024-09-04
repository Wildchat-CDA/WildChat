import React, { useState } from 'react';
import './HeaderNavbarDev.css';

function HeaderNavbarDev({ onViewChange }) {
  const [isTeacherView, setIsTeacherView] = useState(false);

  function handleViewChange() {
    const newView = !isTeacherView ? 'teacher' : 'student';
    setIsTeacherView(!isTeacherView);
    onViewChange(newView);
  }

  return (
    <nav className={`header-navbar-dev ${isTeacherView ? 'teacher-view' : 'student-view'}`}>
      <div className="navbar-content">
        <span>Dev Mode: {isTeacherView ? 'Professeur' : 'Élève'}</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={isTeacherView}
            onChange={handleViewChange}
          />
          <span className="slider"></span>
        </label>
      </div>
    </nav>
  );
}

export default HeaderNavbarDev;