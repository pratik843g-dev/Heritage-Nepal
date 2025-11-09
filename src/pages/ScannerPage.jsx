import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import QRScanner from '../components/QRScanner';
import { getSiteById, getAllSiteIds } from '../data/heritageSites';
import { QrCode, AlertCircle, CheckCircle2, Upload, Image } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const html5QrCode = new Html5Qrcode("file-qr-reader");
      const decodedText = await html5QrCode.scanFile(file, false);
      console.log("QR code decoded from file:", decodedText);
      handleScanSuccess(decodedText);
    } catch (err) {
      console.error("Error reading QR code from file:", err);
      setError('Unable to read QR code from the selected image. Please try another image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleScanSuccess = (decodedText) => {
    console.log("🔍 Scanned QR Code:", decodedText);
    
    let siteId = null;
    
    try {
      // Try to parse as JSON (Data QR code)
      const jsonData = JSON.parse(decodedText);
      console.log("📦 Parsed JSON data:", jsonData);
      if (jsonData.app === "heritage" && jsonData.id) {
        siteId = jsonData.id;
        console.log("✅ Extracted site ID from JSON:", siteId);
      }
    } catch (e) {
      // Not JSON, try other formats
      console.log("📝 Not JSON, trying URL/text parsing...");
      
      // Clean up the decoded text
      let cleanText = decodedText.trim();
      
      // Check if it's a URL with /site/
      if (cleanText.includes('/site/')) {
        const parts = cleanText.split('/site/');
        siteId = parts[1].split(/[?#/]/)[0]; // Remove query params, hash, and trailing slashes
        console.log("🌐 Extracted site ID from URL:", siteId);
      } 
      // Check if it has a colon separator (e.g., "heritage:pashupatinath")
      else if (cleanText.includes(':') && !cleanText.includes('://')) {
        siteId = cleanText.split(':').pop();
        console.log("🔗 Extracted site ID from colon format:", siteId);
      }
      // Otherwise, assume it's the site ID directly
      else {
        siteId = cleanText;
        console.log("📌 Using raw text as site ID:", siteId);
      }
    }
    
    console.log("🔎 Looking up site with ID:", siteId);
    const site = getSiteById(siteId);
    
    if (site) {
      console.log("✅ Site found:", site.name);
      setScanResult(site);
      setError(null);
      // Navigate after a short delay
      setTimeout(() => {
        navigate(`/site/${site.id}`);
      }, 1500);
    } else {
      console.error("❌ Site not found for ID:", siteId);
      console.log("📋 Available site IDs:", getAllSiteIds());
      setError(`QR code not recognized. Scanned: "${decodedText.substring(0, 50)}..." - Site ID: "${siteId}" not found.`);
      setIsScanning(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <QrCode className="w-16 h-16 text-nepal-red mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">QR Code Scanner</h2>
        <p className="text-gray-600">
          Scan heritage site QR codes to discover their stories
        </p>
      </motion.div>

      {/* Scan Button */}
      {!isScanning && !scanResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button
              onClick={() => setIsScanning(true)}
              className="btn-primary text-lg py-6 px-8 rounded-2xl flex-1 flex items-center justify-center gap-2"
            >
              <QrCode className="w-6 h-6" />
              Start Scanning
            </button>
            
            <label className="btn-secondary text-lg py-6 px-8 rounded-2xl flex-1 flex items-center justify-center gap-2 cursor-pointer hover:bg-nepal-blue/20 transition-colors">
              <Upload className="w-6 h-6" />
              Upload QR Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isProcessing}
              />
            </label>
          </div>

          {/* Hidden div for file scanning */}
          <div id="file-qr-reader" className="hidden"></div>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="glass-card rounded-2xl p-4 w-full max-w-md">
              <div className="flex items-center gap-3 justify-center text-nepal-blue">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-nepal-blue"></div>
                <span className="font-semibold">Processing image...</span>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="glass-card rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Tips:</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-nepal-red">•</span>
                <span>Ensure good lighting for better scanning</span>
              </li>
              <li className="flex gap-2">
                <span className="text-nepal-red">•</span>
                <span>Hold your device steady</span>
              </li>
              <li className="flex gap-2">
                <span className="text-nepal-red">•</span>
                <span>Position the QR code within the frame</span>
              </li>
              <li className="flex gap-2">
                <span className="text-nepal-red">•</span>
                <span>Grant camera permission when prompted</span>
              </li>
              <li className="flex gap-2">
                <span className="text-nepal-red">•</span>
                <span>Or upload a QR code image from your device</span>
              </li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Success Message */}
      {scanResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Site Found!</h3>
          <p className="text-gray-600 text-center">
            Redirecting to {scanResult.name}...
          </p>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-6 bg-red-50 border-2 border-red-200"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Scan Error</h3>
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setIsScanning(true);
                }}
                className="mt-4 btn-primary text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scanner Component */}
      {isScanning && (
        <QRScanner
          onScanSuccess={handleScanSuccess}
          onClose={() => setIsScanning(false)}
        />
      )}
    </div>
  );
}

export default ScannerPage;
