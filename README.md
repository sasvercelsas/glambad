# Target Gift Card Landing Page

A high-conversion landing page for Target gift card offers.

## Deploy to Vercel

1. Copy all files from this `vercel-ready` folder to your GitHub repo (replace existing files or add to empty repo)

2. In Vercel:
   - Import your GitHub repo
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click Deploy

## Customize

### Change the Offer Link
Edit `src/pages/Home.tsx` line 9:
```typescript
const OFFER_LINK = "https://your-offer-link-here";
```

### Change the Amount
Search for `$750` in `src/pages/Home.tsx` and replace with your amount.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output will be in the `dist` folder.
