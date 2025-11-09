# 🚀 START HERE - For New Users!

## Just Pulled This Project? Read This First!

---

## ⚡ Quick Setup (3 Commands)

### **1. Check if Node.js is installed:**
```bash
node --version
```

**Expected output:** `v18.x.x` or higher

**If you get an error:** Node.js is not installed!
- Download from: https://nodejs.org
- Install LTS version
- Restart your computer
- Try `node --version` again

---

### **2. Install dependencies:**
```bash
npm install
```

**What this does:** Downloads all required packages (React, Vite, etc.)

**Wait time:** 2-3 minutes

**Expected output:** 
```
added 234 packages
```

**If you get errors:** See troubleshooting below

---

### **3. Run the project:**
```bash
npm run dev
```

**Expected output:**
```
VITE v5.4.21 ready in 211 ms

➜  Local:   http://localhost:5173/
```

**Open your browser to:** http://localhost:5173

---

## 🎉 That's It!

You should now see the Heritage Nepal website!

---

## 🐛 Common Problems

### **Problem: "npm is not recognized"**
**Solution:** Node.js not installed
```
1. Go to: https://nodejs.org
2. Download LTS version (v18 or v20)
3. Install it
4. Restart your computer
5. Try again
```

### **Problem: "Port 5173 is in use"**
**Solution:** Another app is using that port
```
Vite will automatically use port 5174 instead
Just open http://localhost:5174
```

### **Problem: Errors during npm install**
**Solution:** Clear cache and try again
```bash
npm cache clean --force
npm install
```

### **Problem: Nothing happens after npm run dev**
**Solution:** Look for the URL in the terminal output
```
The URL might be on a different port
Example: http://localhost:5174
Open that URL in your browser
```

---

## 📋 Requirements

**Before you start, make sure you have:**
- ✅ Node.js v18+ installed
- ✅ npm v9+ installed (comes with Node.js)
- ✅ 500MB free storage
- ✅ Internet connection (for initial setup)

**Check versions:**
```bash
node --version    # Should be v18+
npm --version     # Should be v9+
```

---

## 📁 Project Structure

```
heritage123/
├── src/              ← Source code (React components)
├── public/           ← Static files
├── dist/             ← Built files (created after npm run build)
├── node_modules/     ← Dependencies (created after npm install)
├── package.json      ← Dependency list
├── START_HERE.md     ← You are here!
├── SETUP_GUIDE.md    ← Detailed setup guide
└── README.md         ← Project documentation
```

---

## 🎯 What to Do After Setup

1. ✅ Open http://localhost:5173 in browser
2. ✅ Test the homepage
3. ✅ Try scanning a QR code
4. ✅ Browse the heritage sites
5. ✅ Test the "Near Me" feature
6. ✅ Save some favorites
7. ✅ Try the admin panel (password: `heritage2025`)

---

## 📚 More Information

- **Detailed setup guide:** See `SETUP_GUIDE.md`
- **Full requirements:** See `requirements.txt` or `REQUIREMENTS.md`
- **Project documentation:** See `README.md`
- **Monetization ideas:** See `MONETIZATION_STRATEGY.md`
- **Presentation guide:** See `ppt_gamma.txt`

---

## 🆘 Still Not Working?

### **Last Resort - Nuclear Option:**
```bash
# 1. Delete these if they exist:
#    - node_modules folder
#    - package-lock.json file
#    - dist folder

# 2. Run fresh install:
npm install

# 3. Run the project:
npm run dev
```

### **If that doesn't work:**
1. Make sure Node.js v18+ is installed: `node --version`
2. Make sure you're in the right folder (should see package.json)
3. Try running as administrator (Windows) or with sudo (Mac/Linux)
4. Check your antivirus isn't blocking npm
5. Try a different internet connection

---

## ✅ Success Checklist

You know it's working when:
- [ ] `npm install` completes without errors
- [ ] `npm run dev` shows "VITE ready"
- [ ] Browser opens to Heritage Nepal homepage
- [ ] You see Nepal flag and sites
- [ ] Can navigate between pages
- [ ] Features are clickable

---

## 🎓 For Developers

### **Available Commands:**
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

### **Tech Stack:**
- React 18.3
- Vite 5.4
- TailwindCSS 3.4
- Framer Motion
- React Router

---

## 📞 Need Help?

**GitHub Repository:** https://github.com/pratik843g-dev/Heritage-Nepal

**Common Issues:**
- 90% of problems = Node.js not installed or wrong version
- 5% of problems = Need to run `npm install` first
- 5% of problems = Port already in use (check terminal for new port)

---

## 🎉 Enjoy Heritage Nepal!

**Once it's running, you can:**
- 📱 Scan QR codes of heritage sites
- 🗺️ Find sites near you with GPS
- ❤️ Save your favorite sites
- 📚 Learn about Nepal's rich cultural heritage
- 🔧 Generate QR codes (admin panel)

**Happy exploring!** 🇳🇵✨
