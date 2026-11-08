import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ph.tapalatte.kiosk',
  appName: 'Tap-a-Latte',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#2E190E',
      showSpinner: false
    }
  }
};

export default config;
