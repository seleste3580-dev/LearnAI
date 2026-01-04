import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.learnai.app',
  appName: 'LearnAI',
  webDir: 'out',
  // Server config: update to your deployed Vercel URL (e.g. 'https://learnai.vercel.app')
  // The site will be deployed from `/site`. After deployment, replace the URL below.
  // server: {
  //   url: 'https://<YOUR_VERCEL_URL>'
  // }
  // Note: while testing you can remove the above comment and set the url field to your site URL.
};

export default config;
