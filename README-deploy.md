Deployment notes

This repo now includes an automatic Vercel deployment and an APK build CI workflow.

Vercel deployment
- To enable automatic deploys to Vercel, add the following repository secrets:
  - VERCEL_TOKEN
  - VERCEL_ORG_ID
  - VERCEL_PROJECT_ID
- The workflow deploys the `site/` directory. After the first successful deploy, update `capacitor.config.ts` -> `server.url` with your Vercel production URL.

APK build & release
- The `android-build-release.yml` workflow builds a signed release APK on push to `main` and creates a GitHub Release with the APK asset.
- The workflow currently uses the project's gradle configuration; it does NOT include signed keystore in the repo. CI will build using the project's own signing config (we generated a keystore locally); if you prefer CI-generated keystore, modify the workflow to generate one and keep secrets secure.

Notes
- If you want me to (a) add automatic rebuild+release after the site deploys and the server.url is known, or (b) upload the APK to the site itself, tell me and I’ll add the extra steps.  
- If you prefer GitHub Pages over Vercel, I can change the workflows accordingly.
