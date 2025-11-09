# 🔐 Heritage Site QR Code Generator

This folder contains a simple website to generate and print QR codes for all Nepal heritage sites.

## 📁 Files

- **index.html** - Main QR code print sheet (displays all 6 sites)
- **individual.html** - Individual full-page QR codes (one per page)

## 🚀 How to Use

### Method 1: Open Locally
1. Open `index.html` in your web browser
2. Click "Print All QR Codes" button
3. Print the page (Ctrl+P or Cmd+P)
4. Cut out individual cards

### Method 2: Deploy Online
1. Upload the `secret` folder to any web hosting
2. Access via URL
3. Print from anywhere

## 📋 What You Get

Each QR code card includes:
- **Site Name** - Clear, bold heading
- **Location** - City/district information
- **UNESCO Badge** - For World Heritage Sites
- **QR Code** - 250x250px, high contrast for easy scanning
- **Instructions** - Brief description for visitors

## 🖨️ Printing Tips

### For Best Results:
- **Paper**: Use thick cardstock or photo paper
- **Size**: Print at 100% scale (no fit to page)
- **Color**: Full color recommended
- **Quality**: Use highest print quality setting

### After Printing:
1. **Cut** along the card borders
2. **Laminate** for weather protection (highly recommended)
3. **Mount** on sturdy backing (foam board or acrylic)
4. **Install** at heritage site entrances or information boards

## 🔗 QR Code Format

Each QR code contains: `heritage-nepal:SITE-ID`

Example: `heritage-nepal:pashupatinath`

When scanned with the Nepal Heritage Explorer app, it will:
1. Automatically detect the site
2. Display full information
3. Show history, architecture, facts
4. Provide visiting hours and fees

## 📱 Testing QR Codes

Before installation:
1. Open the Nepal Heritage Explorer app (http://localhost:5173)
2. Go to "Scan" tab
3. Scan each printed QR code
4. Verify it opens the correct heritage site

## 🏛️ Sites Included

1. **Pashupatinath Temple** - UNESCO Site
2. **Boudhanath Stupa** - UNESCO Site
3. **Swayambhunath (Monkey Temple)** - UNESCO Site
4. **Kathmandu Durbar Square** - UNESCO Site
5. **Lumbini** - UNESCO Site
6. **Bhaktapur Durbar Square** - UNESCO Site

## 💡 Tips for Installation

### Indoor Placement:
- Near ticket counters
- At information desks
- On entrance pillars
- Next to site maps

### Outdoor Placement:
- **Must** use lamination
- Mount under protective covers
- Use weather-resistant materials
- Check regularly for wear

### Visibility:
- Place at eye level (5-6 feet)
- Ensure good lighting
- Keep area clean and unobstructed
- Add small instruction sign if needed

## 🔧 Customization

To add more sites, edit the `heritageSites` array in the HTML file:

```javascript
{
    id: "your-site-id",
    name: "Your Site Name",
    location: "Location",
    unesco: true/false
}
```

## 📞 Support

If QR codes don't scan properly:
- Ensure adequate lighting
- Clean the QR code surface
- Hold phone steady
- Try different distances (6-12 inches)
- Reprint if damaged

---

**Built for Nepal Heritage Explorer**
Made with ❤️ for preserving cultural heritage
