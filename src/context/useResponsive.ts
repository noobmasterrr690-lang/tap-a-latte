import { useState, useEffect } from 'react';

export interface ResponsiveState {
  isMobile: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
  width: number;
  height: number;
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isDesktop: true,
        orientation: 'landscape',
        width: 1200,
        height: 800
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation = width >= height ? 'landscape' : 'portrait';
    
    // Automatic mobile detection:
    // 1. Any screen width below 768px (smartphones)
    // 2. Portrait mode under 900px (e.g. phones or small tablets held vertically)
    const isMobile = width < 768 || (orientation === 'portrait' && width < 900);

    return {
      isMobile,
      isDesktop: !isMobile,
      orientation,
      width,
      height
    };
  });

  useEffect(() => {
    let timeoutId: number;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const orientation = width >= height ? 'landscape' : 'portrait';
        
        // Purely automatic detection based on orientation & viewport dimension
        // No manual button or user toggle intervention
        const isMobile = width < 768 || (orientation === 'portrait' && width < 900);

        setState({
          isMobile,
          isDesktop: !isMobile,
          orientation,
          width,
          height
        });
      }, 50); // fast responsive response
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    const mediaQueryPortrait = window.matchMedia('(orientation: portrait)');
    mediaQueryPortrait.addEventListener('change', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      mediaQueryPortrait.removeEventListener('change', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
}
