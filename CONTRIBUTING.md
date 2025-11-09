# Contributing to Nepal Heritage Explorer

Thank you for considering contributing to the Nepal Heritage Explorer project! We welcome contributions from everyone.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and device information

### Suggesting Features

We love new ideas! Please open an issue with:
- Clear description of the feature
- Use case and benefits
- Mockups or examples (if applicable)

### Adding Heritage Sites

To add a new heritage site:

1. Edit `src/data/heritageSites.js`
2. Follow this structure:

```javascript
"site-id": {
  id: "site-id",
  name: "Site Name",
  location: "Location",
  type: "Site Type",
  builtYear: "Year",
  unescoStatus: true/false,
  description: "Detailed description...",
  significance: "Cultural/religious significance...",
  architecture: "Architectural details...",
  timings: "Opening hours",
  entryFee: "Fee information",
  bestTimeToVisit: "Best time...",
  nearbyAttractions: ["Attraction 1", "Attraction 2"],
  images: [
    "Image URL 1",
    "Image URL 2"
  ],
  coordinates: { lat: 27.xxxx, lng: 85.xxxx },
  facts: [
    "Interesting fact 1",
    "Interesting fact 2"
  ]
}
```

3. Use high-quality images (preferably from Unsplash or with proper attribution)
4. Ensure all information is accurate and sourced

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the existing code style
   - Write clear commit messages
   - Test your changes thoroughly
4. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**
   - Clearly describe your changes
   - Reference any related issues
   - Include screenshots for UI changes

## 📝 Code Style Guidelines

### JavaScript/React
- Use functional components with hooks
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components focused and reusable

### CSS/TailwindCSS
- Use TailwindCSS utility classes
- Follow existing color scheme (nepal-red, nepal-blue)
- Ensure responsive design for all screen sizes

### File Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── data/          # Static data (heritage sites)
└── main.jsx       # App entry point
```

## 🧪 Testing

Before submitting:
1. Test on multiple browsers (Chrome, Firefox, Safari)
2. Test on mobile devices
3. Test QR code scanning with both types (URL and Data)
4. Verify no console errors
5. Check responsive design

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 💡 Questions?

Feel free to open an issue for any questions or discussions about contributing!

---

**Thank you for helping preserve and share Nepal's heritage! 🙏**
