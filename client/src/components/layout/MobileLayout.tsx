import React from 'react';
import Navbar from '../common/Navbar/Navbar';
import HeaderNavbarDev from "../common/HeaderNavbarDev/HeaderNavbarDev"

interface MobileLayoutProps {
  children: React.ReactNode;
}

function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="mobile-layout">
    <HeaderNavbarDev />
    <div className="mobile-content">
      {children}
    </div>
    <Navbar isMobile={true} />
  </div>
  );
}

export default MobileLayout;