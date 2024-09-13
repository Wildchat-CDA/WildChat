import React from 'react';
import RaisedHandsList from '../../../teacher/RaisedHandsList';
import { useUserRole } from '../../../../context/UserRoleContext';
import './ContentSidebar.css';
import Section from '../../../channel/section/Section';
import GlobalRoom from '../../../GlobalRoom';
import { AudioCall } from '../../../audio/AudioCall';


function ContentSidebar({muted}) {
  const { userRole } = useUserRole();

  return (
    <aside className='content-sidebar'>
      {userRole === 'teacher' && <RaisedHandsList />}
      <Section />
      {/* Autres composants de la sidebar si nécessaire */}
      {/* <GlobalRoom muted={muted} /> */}
      <AudioCall/>
    </aside>
  );
}

export default ContentSidebar;
