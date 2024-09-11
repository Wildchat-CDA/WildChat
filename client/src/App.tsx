import React, { useState, useEffect } from 'react';
import './App.css';
import { HandRaiseProvider } from './context/HandRaiseContext';
import { UserRoleProvider } from './context/UserRoleContext';
import DesktopLayout from './components/layout/DesktopLayout';
import MobileLayout from './components/layout/MobileLayout';
import ContentMain from './components/common/ContentMain';
import ContentSidebar from './components/common/ContentSidebar/ContentSidebar';

function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize <= 768;

  const mainContent = (
    <>
      <ContentSidebar />
      <ContentMain />
    </>
  );

  return (
    <UserRoleProvider>
      <HandRaiseProvider>
        {isMobile ? (
          <MobileLayout>{mainContent}</MobileLayout>
        ) : (
          <DesktopLayout>{mainContent}</DesktopLayout>
        )}
      </HandRaiseProvider>
    </UserRoleProvider>
  );
}

export default App;
