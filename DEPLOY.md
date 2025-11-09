# 🚀 Quick Deployment Guide

## Your Heritage Nepal app is ready to deploy!

### Option 1: Netlify (Recommended - Free & Fast)

#### Step 1: Authenticate with Netlify
```bash
netlify login
```
This will open your browser - just log in or create a free account.

#### Step 2: Deploy
```bash
npm run build
netlify deploy --prod --dir=dist
```

When prompted:
- **Create & configure a new site**: Yes
- **Team**: Choose your team (or default)
- **Site name**: nepal-heritage-explorer (or any name you prefer)

✅ Your site will be live at: `https://nepal-heritage-explorer.netlify.app`

---

### Option 2: Vercel (Also Free)

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

### Option 3: GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Set source to GitHub Actions
4. Use the Vite deployment workflow

---

### Option 4: Manual Netlify Drop

1. Go to https://app.netlify.com/drop
2. Drag and drop your `dist` folder
3. Instant deployment!

---

## 📦 Your Build is Ready!

The `dist` folder contains your production-ready app. You can deploy it anywhere that hosts static sites.

**Build output:**
- ✅ Optimized assets in `/dist`
- ✅ Compressed for fast loading
- ✅ Ready for production

**Live URL will be:**
`https://your-site-name.netlify.app` (or .vercel.app)

---

## 🎯 After Deployment

Share your QR codes! They're already in the app at `/qr-generator`

Users can scan them to get complete heritage site information instantly!
