# 🚀 Heritage Nepal - Complete Setup Guide

## For Your Friend Who Just Pulled the Project!

Follow these steps **EXACTLY** to get the project running on any PC.

---

## ⚡ Quick Start (3 Steps)

### **Step 1: Install Node.js** (If not installed)
```
1. Go to: https://nodejs.org
2. Download: LTS version (v18 or higher)
3. Install with default settings
4. Restart your computer
```

**Verify Installation:**
```bash
node --version
# Should show: v18.x.x or higher

npm --version
# Should show: v9.x.x or higher
```

### **Step 2: Install Dependencies**
Open terminal/command prompt in project folder:
```bash
cd g:\heritage\heritage123
npm install
```

**Wait 2-3 minutes** while it downloads all packages.

### **Step 3: Run the Project**
```bash
npm run dev
```

**That's it!** Open browser to: http://localhost:5173

---

## 🐛 Common Problems & Solutions

### **Problem 1: "npm is not recognized"**
**Solution:** Node.js not installed or not in PATH
```bash
# Download and install Node.js from: https://nodejs.org
# During installation, check "Add to PATH"
# Restart computer after installation
```

### **Problem 2: "Port 5173 is in use"**
**Solution:** Another app using that port
```bash
# Vite will automatically use another port (5174, 5175, etc.)
# Just open the URL shown in terminal
# Example: http://localhost:5174
```

### **Problem 3: "Cannot find module"**
**Solution:** Dependencies not installed
```bash
# Delete node_modules folder (if exists)
# Delete package-lock.json (if exists)
# Run fresh install:
npm install
```

### **Problem 4: "Permission denied"**
**Solution:** Run as administrator (Windows) or with sudo (Mac/Linux)
```bash
# Windows: Right-click Command Prompt → "Run as Administrator"
# Mac/Linux: 
sudo npm install
```

### **Problem 5: Build fails or errors during npm install**
**Solution:** Clear npm cache
```bash
npm cache clean --force
npm install
```

### **Problem 6: "Git not found" or "Failed to pull"**
**Solution:** Install Git
```bash
# Download from: https://git-scm.com
# Install with default settings
# Restart terminal
```

---

## 📋 Complete Setup (For Fresh PC)

### **1. Install Node.js**
```
Website: https://nodejs.org
Download: LTS version (18.x or 20.x)
Install: Use default settings
Verify: Open Command Prompt and type: node --version
```

### **2. Install Git (Optional but recommended)**
```
Website: https://git-scm.com
Download: Latest version for your OS
Install: Use default settings
```

### **3. Clone/Pull the Project**
```bash
# If cloning for first time:
git clone https://github.com/pratik843g-dev/Heritage-Nepal.git
cd Heritage-Nepal

# If already have the folder:
cd g:\heritage\heritage123
git pull origin main
```

### **4. Install Project Dependencies**
```bash
npm install
```

**This will install:**
- React (UI framework)
- Vite (Build tool)
- TailwindCSS (Styling)
- Framer Motion (Animations)
- html5-qrcode (QR scanning)
- And 10+ other packages

**Wait time:** 2-5 minutes depending on internet speed

### **5. Run Development Server**
```bash
npm run dev
```

**You'll see:**
```
VITE v5.4.21 ready in 211 ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.70:5173/
➜  press h + enter to show help
```

### **6. Open in Browser**
```
Click the link: http://localhost:5173
Or open browser and type: localhost:5173
```

---

## 🖥️ System Requirements

### **Minimum:**
- Windows 10/11, macOS 10.15+, or Linux
- 4GB RAM (8GB recommended)
- 500MB free storage
- Internet connection (for initial setup)

### **Software:**
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher
- Modern web browser (Chrome, Firefox, Edge, Safari)

---

## 📁 What Gets Installed

After running `npm install`, you'll see:
```
heritage123/
├── node_modules/        ← 450MB of packages (auto-installed)
├── dist/               ← Built files (after npm run build)
├── src/                ← Source code (already there)
├── public/             ← Static assets (already there)
└── package.json        ← Dependency list (already there)
```

**Don't delete `node_modules`!** It contains all the libraries.

---

## 🎯 Available Commands

### **Development:**
```bash
npm run dev
# Starts development server at localhost:5173
# Hot reload enabled (auto-refresh on changes)
```

### **Build for Production:**
```bash
npm run build
# Creates optimized production build in dist/ folder
# Takes ~10 seconds
```

### **Preview Production Build:**
```bash
npm run preview
# Preview the production build locally
# Runs at localhost:4173
```

---

## 🔧 Troubleshooting Guide

### **Error: "ENOENT: no such file or directory"**
```bash
# You're not in the correct folder
cd g:\heritage\heritage123
# Then run npm install again
```

### **Error: "gyp ERR! stack Error: not found: python"**
```bash
# Some packages need Python (rare)
# Install Python: https://www.python.org
# OR ignore - project will still work
```

### **Error: "Network error" during npm install**
```bash
# Bad internet connection
# Try again with better connection
# Or use different network
npm install
```

### **Error: "ERR! code EINTEGRITY"**
```bash
# Corrupted cache
npm cache clean --force
npm install
```

### **Nothing happens after npm run dev**
```bash
# Check if port is already in use
# Vite will auto-switch to 5174, 5175, etc.
# Look for the URL in terminal output
```

---

## 📱 Testing on Mobile

### **On Same WiFi Network:**
```bash
1. Run: npm run dev
2. Look for "Network" URL in terminal
   Example: http://192.168.1.70:5173/
3. Open that URL on your phone
4. Test all features!
```

### **For QR Scanner:**
- Needs HTTPS in production
- Works on localhost in development
- Use demo mode if camera doesn't work

---

## 🚀 First Time Setup Checklist

For your friend, check these boxes:

- [ ] Node.js installed (v18+)
- [ ] npm works in terminal (`npm --version`)
- [ ] Project folder opened in terminal
- [ ] `npm install` completed (no errors)
- [ ] `npm run dev` running
- [ ] Browser opened to localhost:5173
- [ ] Website loads correctly
- [ ] All features working

---

## 💡 Pro Tips

### **1. If npm install is slow:**
```bash
# Use npm with faster registry (optional)
npm config set registry https://registry.npmmirror.com
npm install
```

### **2. If you change code:**
```bash
# No need to restart server!
# Vite auto-reloads on file changes
# Just save file and see changes instantly
```

### **3. If you want to share with others:**
```bash
# Build for production
npm run build

# Upload dist/ folder to:
# - Netlify (drag & drop)
# - Vercel
# - GitHub Pages
```

### **4. Keep project updated:**
```bash
git pull origin main
npm install  # Install any new dependencies
npm run dev
```

---

## 📞 Still Not Working?

### **Check these:**
1. ✅ Node.js version: `node --version` (must be v18+)
2. ✅ npm version: `npm --version` (must be v9+)
3. ✅ In correct folder: `dir` (Windows) or `ls` (Mac/Linux)
4. ✅ package.json exists in current folder
5. ✅ No antivirus blocking npm

### **Try fresh install:**
```bash
# 1. Delete these folders/files:
node_modules/
package-lock.json
dist/

# 2. Fresh install:
npm install

# 3. Run again:
npm run dev
```

---

## 🎉 Success Indicators

**You'll know it's working when:**
1. ✅ Terminal shows "VITE ready"
2. ✅ No red errors in terminal
3. ✅ Browser opens to Heritage Nepal homepage
4. ✅ You see Nepal flag and "Heritage Nepal" title
5. ✅ Can navigate between pages
6. ✅ All features clickable

---

## 📧 Need Help?

**GitHub Issues:** https://github.com/pratik843g-dev/Heritage-Nepal/issues

**Common Solutions:**
- Google the exact error message
- Check Node.js is v18+
- Delete node_modules and reinstall
- Restart computer
- Run as administrator

---

## 🎯 Summary for Your Friend

```bash
# JUST RUN THESE 3 COMMANDS:

1. npm install
   (Wait 2-3 minutes)

2. npm run dev
   (Server starts)

3. Open browser to: localhost:5173
   (Enjoy!)
```

**That's literally it!** 🚀

---

**If this guide doesn't work, something is wrong with Node.js installation!**

**Most common issue: Node.js not installed or wrong version!**
