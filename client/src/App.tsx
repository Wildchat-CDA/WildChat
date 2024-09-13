import React, { useState, useEffect } from 'react';
import './App.css';
import { HandRaiseProvider } from './context/HandRaiseContext';
import { UserRoleProvider } from './context/UserRoleContext';
import { NavigationProvider } from './context/NavigationContext';
import DesktopLayout from './components/layout/DesktopLayout';
import MobileLayout from './components/layout/MobileLayout';
import ContentMain from './components/common/mainContent/contentMain/ContentMain';
//import ContentSidebar from './components/common/ContentSidebar/ContentSidebar';
import MainContent from './components/common/mainContent/MainContent';
import { AudioProvider } from './context/AudioContext';

function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [muted, setMuted] = useState(false);


  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize <= 768;

  return (
    <AudioProvider isMuted={muted}>
    <UserRoleProvider>

      <HandRaiseProvider>
        <NavigationProvider>
          {isMobile ? (
            <MobileLayout muted={muted} setMuted={setMuted}>
              <MainContent />
            </MobileLayout>
          ) : (
            <DesktopLayout muted={muted} setMuted={setMuted} >
              <MainContent />
            </DesktopLayout>
          )}
        </NavigationProvider>
      </HandRaiseProvider>
      
    </UserRoleProvider>
    </AudioProvider>
  );
}

export default App;
