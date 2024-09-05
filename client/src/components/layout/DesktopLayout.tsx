import React from 'react';
import Navbar from '../common/Navbar/Navbar';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="desktop-layout">
      <Navbar isMobile={false} />
      <div className="desktop-content">
        {children}
      </div>
    </div>
  );
}

export default DesktopLayout;