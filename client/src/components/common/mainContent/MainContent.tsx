import React from 'react';
import ContentSidebar from './ContentSidebar/ContentSidebar';
import ContentMain from './contentMain/ContentMain';
import './MainContent.css';

const MainContent = () => {
  return (
    <div className='main-content'>
      <ContentSidebar />
      <ContentMain />
    </div>
  );
};

export default MainContent;
