# Friend Criminal Record (FCR)

A mobile-first fictional comedy investigation app for friends. Participants explicitly choose a photo and confirm before any upload flow is invoked. The demo currently keeps the selected image client-side and does not perform facial recognition or real criminal/background checks.

## Features

- Cinematic investigation landing page
- Mobile-first camera capture and image selection
- Explicit confirmation before using a selected photo
- Fake investigation/progress animation
- Deterministic absurd comedy results
- Downloadable result card
- Native share / clipboard fallback
- Ready API seam for optional consent-based storage
- Vercel-friendly Next.js structure

## Local setup

1. Install Node.js 20+.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

No environment variables are required for the current demo.

## Optional storage

`app/api/upload/route.ts` intentionally does not persist face photos yet. If storage is added later, configure a short retention policy, access controls, deletion, and an explicit consent UI before sending the image to the server.

## Routes

- `/` landing page
- `/scan` subject registration + camera/upload
- `/result` fictional case card
- `/api/upload` consent-aware storage seam

## Deployment

Import this repository into Vercel. The default build command is `next build` and the output is handled automatically by Next.js.
