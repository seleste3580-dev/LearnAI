import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.learnai.app',
  appName: 'LearnAI',
  webDir: 'out',
  // Load remote site (replace with your production URL)
  server: {
    url: 'https://learnai.example'
  }
};

export default config;
