import React from 'react';
import Navbar from '../common/Navbar/Navbar';
import HeaderNavbarDev from "../common/HeaderNavbarDev/HeaderNavbarDev"

interface DesktopLayoutProps {
  children: React.ReactNode;
}

function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="desktop-layout">
      <Navbar isMobile={false} />
      <HeaderNavbarDev/>
      <div className="desktop-content">
        {children}
      </div>
    </div>
  );
}

export default DesktopLayout;