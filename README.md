# Friend Criminal Record (FCR)

Mobile-first fictional comedy investigation experience for friends.

## Included
- Responsive mobile-first UI
- Camera capture and image selection
- Explicit user action before a selected photo is used
- Fictional investigation animation
- Random comedy allegations and meters
- Downloadable result card
- Native share / clipboard fallback
- PWA manifest
- Vercel-ready Next.js project
- No real facial recognition
- No hidden camera capture
- No database or external storage required

## Vercel
Import this repository into Vercel. Next.js should be detected automatically. No environment variables are required for the current demo. Click Deploy.

## Local
```bash
npm install
npm run dev
```

## Privacy
Camera access occurs only after the participant presses the camera button and grants browser permission. The selected/captured image is used in the client-side result flow. The included API endpoint requires an explicit consent flag and does not persist images.
