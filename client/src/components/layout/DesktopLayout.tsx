import React from 'react';
import Navbar from '../common/Navbar/Navbar';
import HeaderNavbarDev from '../common/HeaderNavbarDev/HeaderNavbarDev';
import { Height } from '@mui/icons-material';

interface DesktopLayoutProps {
  children: React.ReactNode;
  muted: boolean;
  setMuted: (v: boolean) => void;
}

function DesktopLayout({ children, muted, setMuted }: DesktopLayoutProps) {
  return (
    <div className='desktop-layout' style={{ height: '100%' }}>
      <Navbar isMobile={false} muted={muted} setMuted={setMuted} />
      <HeaderNavbarDev />
      <div className='desktop-content'>{children}</div>
    </div>
  );
}

export default DesktopLayout;
