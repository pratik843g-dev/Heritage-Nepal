# 🚀 Deployment Guide - Nepal Heritage Explorer

Your app has been successfully built! The production files are in the `dist` folder.

## Option 1: Netlify (Recommended - Easiest)

### Method A: Netlify Drop (No CLI needed)
1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop your `dist` folder
3. Your app will be live instantly!
4. You'll get a URL like: `https://random-name.netlify.app`

### Method B: Netlify CLI
```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

## Option 2: Vercel (Very Fast)

### Using Vercel CLI:
```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel login
vercel --prod
```

### Using Vercel Website:
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub/GitLab/Bitbucket
3. Import your project or drag the `dist` folder
4. Deploy!

## Option 3: GitHub Pages

1. Create a GitHub repository
2. Push your code to GitHub
3. Go to Settings → Pages
4. Deploy from the `dist` folder or use GitHub Actions

Add this to your `package.json` scripts:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

Then run:
```bash
npm install -g gh-pages
npm run deploy
```

## Option 4: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Deploy
firebase deploy
```

## Option 5: Surge.sh (Super Simple)

```bash
# Install Surge
npm install -g surge

# Deploy
cd dist
surge
```

## Current Build Info

✅ Build completed successfully!
- **Build size**: ~654 KB (gzipped: ~202 KB)
- **Output folder**: `dist`
- **Build time**: ~3.45s

## Environment Variables

Your app doesn't require any environment variables, so deployment is straightforward!

## Custom Domain

After deploying to any platform, you can:
1. Purchase a domain (e.g., heritageexplorer.com.np)
2. Point it to your deployment URL
3. Most platforms provide easy custom domain setup in their settings

## Testing Before Deployment

Test your production build locally:
```bash
npm run preview
```

This will serve the `dist` folder at http://localhost:4173

## Recommended: Netlify Drop (Quickest Method)

**For instant deployment right now:**
1. Open https://app.netlify.com/drop in your browser
2. Drag the `dist` folder from your project
3. Done! Get your live URL immediately

Your app will be live with:
- Free HTTPS
- Global CDN
- Automatic deploys
- Custom domain support (free)

---

Need help? Let me know which deployment method you prefer!
