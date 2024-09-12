import React from 'react';
import ContentSidebar from './ContentSidebar/ContentSidebar';
import ContentMain from './contentMain/ContentMain';
import './MainContent.css';

const MainContent = ({muted}) => {
  return (
    <div className='main-content'>
      <ContentSidebar muted={muted} />
      <ContentMain />
    </div>
  );
};

export default MainContent;
