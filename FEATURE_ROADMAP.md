# 🗺️ Technical Feature Roadmap

## Quick Start: Implement These 5 Features FIRST

### 1. 💰 **Add Donation Button** (1-2 hours)
**Easiest revenue start - Do this TODAY!**

```javascript
// Install Buy Me a Coffee widget
// In your HomePage.jsx or Layout.jsx:

<a 
  href="https://www.buymeacoffee.com/yourname" 
  target="_blank"
  className="btn-primary flex items-center gap-2"
>
  ☕ Support Heritage Nepal
</a>

// Or use Ko-fi:
<script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>
<script>
  kofiWidgetOverlay.draw('yourname', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Support Nepal Heritage',
    'floating-chat.donateButton.background-color': '#DC143C',
  });
</script>
```

**Tools:**
- [Buy Me a Coffee](https://www.buymeacoffee.com) - 5% fee
- [Ko-fi](https://ko-fi.com) - 0% fee (recommended!)
- [Patreon](https://www.patreon.com) - For recurring support

---

### 2. 📊 **Add Analytics** (2-3 hours)
**Know your users before monetizing!**

```bash
# Install Google Analytics
npm install react-ga4
```

```javascript
// src/main.jsx
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX'); // Your GA4 ID

// Track page views
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Analytics() {
  const location = useLocation();
  
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);
  
  return null;
}

// Add to App.jsx
<Analytics />
```

**Also track custom events:**
```javascript
// When user scans QR code:
ReactGA.event({
  category: 'QR Scanner',
  action: 'Scanned',
  label: siteId
});

// When user views site:
ReactGA.event({
  category: 'Site',
  action: 'Viewed',
  label: siteName
});
```

**Alternative (Privacy-focused):**
- [Plausible Analytics](https://plausible.io) - GDPR compliant
- [Umami](https://umami.is) - Self-hosted, free

---

### 3. 🎧 **Audio Guides** (3-5 days)
**Premium feature users will PAY for!**

```bash
# Install audio player
npm install react-h5-audio-player
```

```javascript
// src/components/AudioGuide.jsx
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function AudioGuide({ audioUrl, isPremium, userHasPremium }) {
  if (isPremium && !userHasPremium) {
    return (
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🎧</span>
          <div>
            <h3 className="font-bold text-gray-900">Audio Guide Available</h3>
            <p className="text-sm text-gray-600">
              Get Premium for full audio tours in 3 languages!
            </p>
          </div>
        </div>
        <button className="btn-primary w-full">
          Unlock Premium - $2.99/month
        </button>
      </div>
    );
  }
  
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🎧</span>
        <h3 className="font-bold text-gray-900">Audio Guide</h3>
      </div>
      <AudioPlayer
        src={audioUrl}
        autoPlayAfterSrcChange={false}
        showJumpControls={false}
        customAdditionalControls={[]}
      />
    </div>
  );
}
```

**Create Audio Files:**

Option 1: **Text-to-Speech (Free/Cheap)**
```bash
# Use Google Cloud Text-to-Speech or Amazon Polly
# Or online: https://ttsmp3.com (free)
```

Option 2: **Hire Voice Actors** (Better quality)
- Fiverr: $5-20 per 100 words
- Upwork: Professional narrators
- Local talent: Support Nepali voice artists!

**Audio Storage:**
- Cloudinary (free tier: 25GB)
- AWS S3
- Firebase Storage

---

### 4. 👤 **User Authentication** (4-6 hours)
**Needed for premium subscriptions!**

```bash
# Install Firebase
npm install firebase
```

```javascript
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ... from Firebase Console
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
```

```javascript
// src/components/AuthButton.jsx
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useState, useEffect } from 'react';

function AuthButton() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);
  
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  const handleLogout = () => signOut(auth);
  
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <img 
          src={user.photoURL} 
          alt={user.displayName}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">{user.displayName}</span>
        <button onClick={handleLogout} className="btn-secondary text-xs">
          Logout
        </button>
      </div>
    );
  }
  
  return (
    <button onClick={handleLogin} className="btn-primary">
      Sign In
    </button>
  );
}
```

---

### 5. 💳 **Payment Integration** (1-2 days)
**For Nepali market: Use Khalti**

```bash
npm install khalti-checkout-web
```

```javascript
// src/components/PremiumUpgrade.jsx
import KhaltiCheckout from 'khalti-checkout-web';

const config = {
  publicKey: "your_khalti_public_key",
  productIdentity: "premium_subscription",
  productName: "Heritage Nepal Premium",
  productUrl: "https://yoursite.com",
  eventHandler: {
    onSuccess(payload) {
      // Payment successful
      console.log(payload);
      // Grant premium access to user
      upgradeUserToPremium(payload);
    },
    onError(error) {
      console.error(error);
    },
    onClose() {
      console.log('Payment widget closed');
    }
  }
};

const checkout = new KhaltiCheckout(config);

function PremiumUpgrade() {
  const handlePayment = () => {
    checkout.show({ amount: 299 }); // Amount in paisa (299 = NPR 2.99)
  };
  
  return (
    <div className="glass-card p-8 rounded-2xl max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Go Premium</h2>
        <div className="text-4xl font-bold text-nepal-red mb-2">
          NPR 299/month
        </div>
        <p className="text-gray-600">or NPR 1,999/year (save 44%)</p>
      </div>
      
      <ul className="space-y-3 mb-6">
        <li className="flex items-start gap-2">
          <span className="text-green-500">✓</span>
          <span>Audio guides in 3 languages</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500">✓</span>
          <span>Offline mode for all sites</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500">✓</span>
          <span>High-res image galleries</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500">✓</span>
          <span>Ad-free experience</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500">✓</span>
          <span>Support heritage conservation</span>
        </li>
      </ul>
      
      <button 
        onClick={handlePayment}
        className="btn-primary w-full text-lg py-4"
      >
        Upgrade Now
      </button>
    </div>
  );
}
```

**Payment Gateway Options:**

1. **Khalti** (Nepal) ⭐ BEST FOR NEPAL
   - Most popular in Nepal
   - Easy integration
   - Supports local banks, wallets
   - Fee: ~2-3%

2. **eSewa** (Nepal)
   - Also very popular
   - Alternative to Khalti

3. **Stripe** (International)
   - For foreign tourists
   - Credit/debit cards
   - Fee: 2.9% + $0.30

**Recommended**: Use BOTH Khalti (for Nepalis) + Stripe (for tourists)

---

## 📱 Medium Priority Features (Weeks 2-4)

### 6. **Offline Mode** (3-4 days)

```javascript
// Install Workbox
npm install workbox-webpack-plugin

// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'heritage-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Heritage Nepal',
        short_name: 'Heritage Nepal',
        description: 'Explore Nepal\'s sacred heritage sites',
        theme_color: '#DC143C',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
};
```

### 7. **Affiliate Links** (1-2 days)

```javascript
// src/components/NearbyHotels.jsx
function NearbyHotels({ siteLocation }) {
  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(siteLocation)}&aid=YOUR_AFFILIATE_ID`;
  
  const agodaUrl = `https://www.agoda.com/search?city=${encodeURIComponent(siteLocation)}&cid=YOUR_AFFILIATE_ID`;
  
  return (
    <div className="glass-card p-6 rounded-xl">
      <h3 className="font-bold mb-4">Where to Stay</h3>
      <div className="grid grid-cols-2 gap-3">
        <a 
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Book Hotels
        </a>
        <a 
          href={agodaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          View on Agoda
        </a>
      </div>
    </div>
  );
}
```

**Sign up for affiliate programs:**
- Booking.com Partner Program
- Agoda Partner Program
- TripAdvisor Affiliate Program
- Local hotel chains

### 8. **Gamification** (3-5 days)

```javascript
// src/data/achievements.js
export const achievements = [
  {
    id: 'first-visit',
    name: 'Heritage Explorer',
    description: 'Visit your first heritage site',
    icon: '🏛️',
    points: 10
  },
  {
    id: 'unesco-collector',
    name: 'UNESCO Collector',
    description: 'Visit all UNESCO World Heritage Sites',
    icon: '🌟',
    points: 100
  },
  {
    id: 'qr-master',
    name: 'QR Master',
    description: 'Scan 10 QR codes',
    icon: '📱',
    points: 50
  },
  // Add more achievements
];

// src/components/AchievementBadge.jsx
function AchievementBadge({ achievement, unlocked }) {
  return (
    <div className={`p-4 rounded-xl ${unlocked ? 'bg-yellow-50' : 'bg-gray-100 opacity-50'}`}>
      <div className="text-4xl mb-2">{achievement.icon}</div>
      <div className="font-bold text-sm">{achievement.name}</div>
      <div className="text-xs text-gray-600">{achievement.description}</div>
      {unlocked && (
        <div className="text-xs text-green-600 mt-1">
          +{achievement.points} points
        </div>
      )}
    </div>
  );
}
```

### 9. **Push Notifications** (2-3 days)

```javascript
// Request permission for notifications
async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    // Register service worker
    const registration = await navigator.serviceWorker.ready;
    
    // Subscribe to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY'
    });
    
    // Send subscription to server
    await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    });
  }
}

// Send notification example
function sendNotification(title, body, icon) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon,
      badge: '/icon-badge.png'
    });
  }
}

// Example uses:
// - "New heritage site added: Changu Narayan Temple!"
// - "Festival Alert: Indra Jatra starts tomorrow at Kathmandu Durbar Square"
// - "Special offer: 50% off Premium this week!"
```

---

## 🚀 Advanced Features (Month 2-3)

### 10. **Virtual Tours** (1-2 weeks)

Use **Pannellum** for 360° images:

```bash
npm install pannellum-react
```

```javascript
import { Pannellum } from "pannellum-react";

function VirtualTour({ site }) {
  return (
    <div className="w-full h-96 rounded-xl overflow-hidden">
      <Pannellum
        width="100%"
        height="100%"
        image={site.panoramaImage}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        showZoomCtrl={false}
        onLoad={() => console.log("Panorama loaded")}
      >
        <Pannellum.Hotspot
          type="custom"
          pitch={31}
          yaw={150}
          text="Main Temple"
          handleClick={() => showInfo('main-temple')}
        />
      </Pannellum>
    </div>
  );
}
```

**Creating 360° content:**
- Use 360° camera: Insta360, Ricoh Theta
- Or hire photographer: $100-300 per site
- Or use existing 360° photos from Google Street View

### 11. **AR Features** (2-3 weeks) - ADVANCED

```javascript
// Using AR.js or Model-Viewer
import '@google/model-viewer';

function ARExperience({ site }) {
  return (
    <model-viewer
      src={site.ar3DModel}
      alt={site.name}
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      environment-image="neutral"
      shadow-intensity="1"
      className="w-full h-96"
    >
      <button slot="ar-button" className="btn-primary">
        View in AR
      </button>
    </model-viewer>
  );
}
```

**Creating AR content:**
- 3D Models: Sketchfab, TurboSquid
- Hire 3D artist: $500-2000 per model
- Or use photogrammetry (photos → 3D model)

### 12. **Backend API** (1-2 weeks)

```javascript
// Using Express.js + Firebase
// server/index.js
import express from 'express';
import admin from 'firebase-admin';

const app = express();
admin.initializeApp();

// Get user subscription status
app.get('/api/user/:userId/subscription', async (req, res) => {
  const userDoc = await admin.firestore()
    .collection('users')
    .doc(req.params.userId)
    .get();
    
  res.json({
    isPremium: userDoc.data()?.isPremium || false,
    subscriptionEnd: userDoc.data()?.subscriptionEnd
  });
});

// Record site visit
app.post('/api/visit', async (req, res) => {
  await admin.firestore()
    .collection('visits')
    .add({
      userId: req.body.userId,
      siteId: req.body.siteId,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    
  res.json({ success: true });
});
```

---

## 📊 Analytics Dashboard (Admin Panel)

```javascript
// src/pages/AdminDashboard.jsx
function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    premiumUsers: 0,
    totalVisits: 0,
    revenue: 0,
    popularSites: []
  });
  
  useEffect(() => {
    // Fetch from Firebase/your backend
    fetchAnalytics();
  }, []);
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value={stats.totalUsers} icon="👥" />
        <StatCard title="Premium Users" value={stats.premiumUsers} icon="⭐" />
        <StatCard title="Site Visits" value={stats.totalVisits} icon="🏛️" />
        <StatCard title="Revenue" value={`NPR ${stats.revenue}`} icon="💰" />
      </div>
      
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Most Popular Sites</h2>
        {/* Chart or list */}
      </div>
    </div>
  );
}
```

---

## 🎯 Priority Order (What to Build First)

### **Week 1: Quick Wins**
1. ✅ Add Ko-fi donation button (2 hours)
2. ✅ Setup Google Analytics (3 hours)
3. ✅ Add affiliate links (1 day)
4. ✅ Create social media presence (2 hours)

### **Week 2: Foundation**
5. ✅ User authentication (Firebase) (2 days)
6. ✅ User profile & favorites (1 day)
7. ✅ Payment integration (Khalti) (2 days)
8. ✅ Premium tier page (1 day)

### **Week 3-4: Premium Features**
9. ✅ Audio guides (5 sites minimum) (1 week)
10. ✅ Offline mode (4 days)
11. ✅ Image galleries (2 days)
12. ✅ Gamification basics (3 days)

### **Month 2: Scale**
13. ✅ B2B landing page (3 days)
14. ✅ Admin dashboard (1 week)
15. ✅ Push notifications (3 days)
16. ✅ More heritage sites (10+ total) (ongoing)

### **Month 3: Advanced**
17. ✅ Virtual tours (1 week)
18. ✅ Live guide booking (1 week)
19. ✅ Multilingual support (1 week)
20. ✅ AR features (2-3 weeks)

---

## 💡 Budget Estimate

### **Minimal Budget (DIY)**
- Domain: $12/year
- Hosting (Netlify): $0 (free tier)
- Firebase: $0 (free tier for start)
- Total: ~$100-200/year

### **Reasonable Budget**
- Above + Audio recording: $200-500
- 360° photography: $500-1000
- Marketing: $200-500/month
- Total Year 1: $5,000-10,000

### **Serious Budget**
- Above + 3D models: $3,000-5,000
- Professional content: $5,000-10,000
- Full-time developer: $20,000-40,000/year
- Marketing: $1,000-2,000/month
- Total Year 1: $50,000-80,000

---

## 🎓 Learning Resources

### **React & Payments**
- Stripe integration: https://stripe.com/docs/payments/accept-a-payment
- Khalti docs: https://docs.khalti.com
- Firebase Auth: https://firebase.google.com/docs/auth

### **Audio/Video**
- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- Pannellum 360°: https://pannellum.org

### **AR/VR**
- AR.js: https://ar-js-org.github.io/AR.js-Docs/
- Model Viewer: https://modelviewer.dev

---

**Start with the Quick Wins, launch with Premium tier, then scale! 🚀**
