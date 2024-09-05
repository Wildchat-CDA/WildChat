import React from 'react';
import Navbar from '../common/Navbar/Navbar';

interface MobileLayoutProps {
  children: React.ReactNode;
}

function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="mobile-layout">
      <div className="mobile-content">
        {children}
      </div>
      <Navbar isMobile={true} />
    </div>
  );
}

export default MobileLayout;