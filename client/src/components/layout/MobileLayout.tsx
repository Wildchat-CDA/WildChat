import React from 'react';
import Navbar from '../common/Navbar/Navbar';
import HeaderNavbarDev from '../common/HeaderNavbarDev/HeaderNavbarDev';


interface MobileLayoutProps {
  children: React.ReactNode;
  muted: boolean;
  setMuted: (v: boolean) => void;
}

function MobileLayout({ children, muted, setMuted }: MobileLayoutProps) {
  return (
    <div className='mobile-layout'>
      <HeaderNavbarDev />
      <div className='mobile-content'>{children}</div>
      <Navbar isMobile={true} muted={muted} setMuted={setMuted} />
    </div>
  );
}

export default MobileLayout;
