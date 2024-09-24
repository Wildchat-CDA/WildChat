// import React, { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import './App.css';
// import { HandRaiseProvider } from './context/HandRaiseContext';
// import { UserRoleProvider } from './context/UserRoleContext';
// import { NavigationProvider } from './context/NavigationContext';
// import DesktopLayout from './components/layout/DesktopLayout';
// import MobileLayout from './components/layout/MobileLayout';
// import { ModalProvider } from './context/ModalContext';
// import MainContent from './components/common/mainContent/MainContent';
// import { AudioProvider } from './context/AudioContext';
// import { AuthProvider } from './context/AuthentificationContext';
// import Login from './components/authentification/LoginForm';
// import Register from './components/authentification/RegisterForm';

// function App() {
//   const [screenSize, setScreenSize] = useState(window.innerWidth);
//   const [muted, setMuted] = useState(true);

//   useEffect(() => {
//     const handleResize = () => setScreenSize(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const isMobile = screenSize <= 768;

//   return (
//     <AuthProvider>
//       <AudioProvider isMuted={muted}>
//         <UserRoleProvider>
//           <HandRaiseProvider>
//             <NavigationProvider>
//               <ModalProvider>
//                 {isMobile ? (
//                   <MobileLayout muted={muted} setMuted={setMuted}>
//                     <MainContent isMobile={true} />
//                   </MobileLayout>
//                 ) : (
//                   <DesktopLayout muted={muted} setMuted={setMuted}>
//                     <MainContent isMobile={false} />
//                   </DesktopLayout>
//                 )}
//               </ModalProvider>
//             </NavigationProvider>
//           </HandRaiseProvider>
//         </UserRoleProvider>
//       </AudioProvider>
//     </AuthProvider>
//   );
// }

//export default App;


import React from 'react';
import './App.css';
import { HandRaiseProvider } from './context/HandRaiseContext';
import { UserRoleProvider } from './context/UserRoleContext';
import { NavigationProvider } from './context/NavigationContext';
import DesktopLayout from './components/layout/DesktopLayout';
import MobileLayout from './components/layout/MobileLayout';
import { ModalProvider } from './context/ModalContext';
import MainContent from './components/common/mainContent/MainContent';
import { AudioProvider } from './context/AudioContext';
import { useAuth } from './context/AuthentificationContext';
import Login from './components/authentification/LoginForm';
import Register from './components/authentification/RegisterForm';

function App() {
  const { user, isLoading, error } = useAuth();
  const [screenSize, setScreenSize] = React.useState(window.innerWidth);
  const [muted, setMuted] = React.useState(true);
  const [authMode, setAuthMode] = React.useState<'login' | 'register'>('login');

  React.useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize <= 768;


  if (!user) {
    return (
      <div className="auth-container">
        {authMode === 'login' ? (
          <>
            <Login />
            <p>
              Vous ne possédez pas de compte ?{' '}
              <button onClick={() => setAuthMode('register')}>S'enregistrer</button>
            </p>
          </>
        ) : (
          <>
            <Register />
            <p>
              Vous avez déjà un compte ?{' '}
              <button onClick={() => setAuthMode('login')}>Se connecter</button>
            </p>
          </>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }

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
}

export default App;