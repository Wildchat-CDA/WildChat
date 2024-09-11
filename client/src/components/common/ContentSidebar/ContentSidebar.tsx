import React from 'react';
import RaisedHandsList from '../../teacher/RaisedHandsList';
import { useUserRole } from '../../../context/UserRoleContext';
import './ContentSidebar.css';

function ContentSidebar() {
  const { userRole } = useUserRole();

  return (
    <aside className="content-sidebar">
      {userRole === 'teacher' && <RaisedHandsList />}
      {/* Autres composants de la sidebar si nécessaire */}
    </aside>
  );
}

export default ContentSidebar;