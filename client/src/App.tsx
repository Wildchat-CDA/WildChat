import React, { useState, useEffect } from 'react';
import './App.css';
import { HandRaiseProvider } from './context/HandRaiseContext';
import { UserRoleProvider } from './context/UserRoleContext';
import { NavigationProvider } from './context/NavigationContext';
import DesktopLayout from './components/layout/DesktopLayout';
import MobileLayout from './components/layout/MobileLayout';
import ContentMain from './components/common/mainContent/contentMain/ContentMain';
import { ModalProvider } from './context/ModalContext';
import MainContent from './components/common/mainContent/MainContent';

function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize <= 768;

  return (
    <UserRoleProvider>
      <HandRaiseProvider>
        <NavigationProvider>
          <ModalProvider>
            {isMobile ? (
              <MobileLayout>
                <MainContent />
              </MobileLayout>
            ) : (
              <DesktopLayout>
                <MainContent />
              </DesktopLayout>
            )}
          </ModalProvider>
        </NavigationProvider>
      </HandRaiseProvider>
    </UserRoleProvider>
  );
}

export default App;
