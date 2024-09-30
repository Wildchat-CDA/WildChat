import React from 'react';
import {Navigate } from 'react-router-dom'; 
import MainContent from './components/common/mainContent/MainContent';
import { HandRaiseProvider } from './context/HandRaiseContext';
import { UserRoleProvider } from './context/UserRoleContext';
import { NavigationProvider } from './context/NavigationContext';
import DesktopLayout from './components/layout/DesktopLayout';
import MobileLayout from './components/layout/MobileLayout';
import { ModalProvider } from './context/ModalContext';
import { AudioProvider } from './context/AudioContext';
import Cookies from 'js-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';



const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = Cookies.get('token');
  const decoded: any = token && jwtDecode<JwtPayload>(token);
  const date = new Date(decoded?.exp * 1000);
  return (token && decoded?.exp * 1000 > new Date().getTime()) ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const [screenSize, setScreenSize] = React.useState(window.innerWidth);
  const [muted, setMuted] = React.useState(true);

  React.useEffect(() => {
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
                  <ModalProvider>
                    {isMobile ? (
                      <MobileLayout muted={muted} setMuted={setMuted}>
                        <MainContent isMobile={true} />
                      </MobileLayout>
                    ) : (
                      <DesktopLayout muted={muted} setMuted={setMuted}>
                        <MainContent isMobile={false} />
                      </DesktopLayout>
                    )}
                  </ModalProvider>
                </NavigationProvider>
              </HandRaiseProvider>
            </UserRoleProvider>
          </AudioProvider>
  );
};

export default App;

