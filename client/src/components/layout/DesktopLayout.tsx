import React from 'react';
import Navbar from '../common/Navbar/Navbar';
import HeaderNavbarDev from "../common/HeaderNavbarDev/HeaderNavbarDev"

interface DesktopLayoutProps {
  children: React.ReactNode;
  muted: boolean;
  setMuted: (v) => void;
}

function DesktopLayout({ children, muted, setMuted  }: DesktopLayoutProps) {
  return (
    <div className="desktop-layout">
      <Navbar isMobile={false} muted={muted} setMuted={setMuted} />
      <HeaderNavbarDev/>
      <div className="desktop-content">
        {children}
      </div>
    </div>
  );
}

export default DesktopLayout;