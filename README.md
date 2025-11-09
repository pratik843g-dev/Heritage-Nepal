# 🏛️ Nepal Heritage Explorer

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)

A modern, interactive web application for exploring Nepal's sacred heritage sites through QR code technology. This app allows visitors to scan QR codes at heritage sites to access detailed information, history, and fascinating facts about Nepal's cultural treasures.

![Nepal Heritage Explorer](https://via.placeholder.com/800x400/DC143C/FFFFFF?text=Nepal+Heritage+Explorer)

## ✨ Features

### 🎯 Core Features
- **📱 QR Code Scanner**: Real-time QR code scanning using device camera
- **📤 Upload QR Image**: Scan QR codes from saved images on your device
- **🗺️ Interactive Exploration**: Browse and search through Nepal's heritage sites
- **📍 Detailed Information**: Comprehensive details about each heritage site including:
  - Historical background and significance
  - Architectural features
  - Visiting hours and entry fees
  - Interesting facts and trivia
  - Nearby attractions
  - Best time to visit
- **🎨 Beautiful UI/UX**: Modern, responsive design with smooth animations
- **🌟 UNESCO Highlights**: Special badges for UNESCO World Heritage Sites
- **🔗 Share & Navigate**: Share sites and get directions via Google Maps
- **📲 QR Code Generation**: Generate both URL and Data QR codes for sharing sites

### 🔥 Recent Updates
- ✅ Enhanced QR scanner with JSON data support
- ✅ File upload feature for scanning QR codes from images
- ✅ Improved URL parsing with better error handling
- ✅ Detailed console debugging for troubleshooting

## 🛠️ Tech Stack

- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Navigation and routing
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **html5-qrcode** - QR code scanning
- **qrcode.react** - QR code generation
- **Lucide React** - Beautiful icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📱 Usage

### For Visitors

1. **Homepage**: Get an overview of Nepal's heritage sites
2. **Scan Tab**: Use your device camera to scan QR codes at heritage sites
3. **Explore Tab**: Browse all available sites, search, and filter
4. **Site Details**: View comprehensive information about each site

### For Site Administrators

Generate QR codes for each heritage site:
1. Navigate to any site's detail page
2. Click "Show QR Code"
3. Print and place the QR code at the heritage site

## 🏛️ Heritage Sites Included

- **Pashupatinath Temple** - Sacred Hindu temple complex
- **Boudhanath Stupa** - One of the largest Buddhist stupas
- **Swayambhunath (Monkey Temple)** - Ancient Buddhist temple
- **Kathmandu Durbar Square** - Historic palace complex
- **Lumbini** - Birthplace of Buddha
- **Bhaktapur Durbar Square** - Medieval city center

## 🎨 Design Features

- **Glass morphism** design elements
- **Smooth animations** with Framer Motion
- **Responsive** layout for all devices
- **Intuitive navigation** with bottom tab bar
- **Nepal-themed** color palette (red and blue)
- **High-quality images** of heritage sites

## 📄 QR Code Format

The app supports **two types** of QR codes:

### 1. URL QR Codes
Contains the full website URL:
```
https://your-site.netlify.app/site/pashupatinath
```
- Opens website directly in any browser
- Works with any QR scanner app
- Requires internet connection

### 2. Data QR Codes
Contains JSON data with site information:
```json
{
  "app": "heritage",
  "id": "pashupatinath",
  "name": "Pashupatinath Temple",
  "location": "Kathmandu",
  "url": "https://your-site.netlify.app/site/pashupatinath"
}
```
- Works offline with the app scanner
- Contains embedded site information
- Faster site lookup

### 3. Legacy Formats (Supported)
- `heritage:pashupatinath`
- `pashupatinath` (direct site ID)

## 🌐 Browser Support

- Chrome (recommended for camera access)
- Firefox
- Safari
- Edge

**Note**: Camera access required for QR scanning feature

## 🤝 Contributing

Contributions are welcome! To add more heritage sites:

1. Edit `src/data/heritageSites.js`
2. Add site details following the existing structure
3. Include high-quality images (preferably from Unsplash)

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Heritage site information sourced from UNESCO and Nepal Tourism Board
- Images from Unsplash
- Icons from Lucide

---

**Built with ❤️ for Nepal's Heritage**
