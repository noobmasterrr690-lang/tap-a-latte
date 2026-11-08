import React from 'react';
import { useResponsive } from '../../context/useResponsive';
import { MobileLayout } from './MobileLayout';
import { DesktopLayout } from './DesktopLayout';
import { Header } from '../common/Header';

export const ResponsiveRoot: React.FC = () => {
  const { isMobile, orientation, width } = useResponsive();

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col antialiased">
      {/* Top Application Header */}
      <Header />

      {/* Dynamic, Automatic Layout Switcher:
          Switches automatically between Dedicated Mobile Layout and Dedicated Desktop/Kiosk Layout
          strictly based on viewport dimensions & orientation change without any button */}
      <div className="flex-1 w-full">
        {isMobile ? (
          <div key="mobile-layout-view" className="animate-fadeIn w-full">
            <MobileLayout />
          </div>
        ) : (
          <div key="desktop-layout-view" className="animate-fadeIn w-full">
            <DesktopLayout />
          </div>
        )}
      </div>
    </div>
  );
};
