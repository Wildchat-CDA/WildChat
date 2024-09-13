import React from 'react';
import RaisedHandsList from '../../../teacher/RaisedHandsList';
import { useUserRole } from '../../../../context/UserRoleContext';
import './ContentSidebar.css';
import Section from '../../../channel/section/Section';
import { AudioCall } from '../../../audio/AudioCall';




function ContentSidebar() {
  const { userRole } = useUserRole();

  return (
    <aside className='content-sidebar'>
      {userRole === 'teacher' && <RaisedHandsList />}
      <Section />
      <AudioCall/>
      {/* Autres composants de la sidebar si nécessaire */}
    </aside>
  );
}

export default ContentSidebar;
