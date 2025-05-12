
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e1f191f0b50241d592bfa45490355f9a',
  appName: 'LoyalT',
  webDir: 'dist',
  server: {
    url: "https://e1f191f0-b502-41d5-92bf-a45490355f9a.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  ios: {
    scheme: 'LoyalT'
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#009EA3",
      showSpinner: true,
      spinnerColor: "#C2F4E5",
      androidSplashResourceName: "splash"
    }
  }
};

export default config;
