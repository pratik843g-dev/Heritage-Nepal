import { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Download, QrCode, Search, Globe, Database } from 'lucide-react';
import { getAllSites } from '../data/heritageSites';

function QRGeneratorPage() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [qrType, setQrType] = useState('both'); // 'url', 'data', or 'both'
  const [websiteUrl, setWebsiteUrl] = useState('https://nepal-heritage-explorer.netlify.app');
  const allSites = getAllSites();

  const filteredSites = allSites.filter(site =>
    site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadQR = (svgId, filename) => {
    const svg = document.getElementById(svgId);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 1000;
      canvas.height = 1000;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 1000, 1000);
      
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleDownload = (site, type) => {
    if (type === 'url') {
      downloadQR(`qr-url-${site.id}`, `${site.id}-url-qr.png`);
    } else if (type === 'data') {
      downloadQR(`qr-data-${site.id}`, `${site.id}-data-qr.png`);
    } else {
      // Download both
      setTimeout(() => downloadQR(`qr-url-${site.id}`, `${site.id}-url-qr.png`), 100);
      setTimeout(() => downloadQR(`qr-data-${site.id}`, `${site.id}-data-qr.png`), 600);
    }
  };

  const handleDownloadAll = () => {
    allSites.forEach((site, index) => {
      setTimeout(() => handleDownload(site), index * 500);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nepal-blue/5 via-white to-nepal-red/5 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-nepal-red to-nepal-blue rounded-full mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            QR Code Generator
          </h1>
          <p className="text-gray-600">
            Generate high-quality QR codes for heritage sites
          </p>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-8 space-y-4"
        >
          {/* Website URL Input */}
          <div className="glass-card rounded-xl p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Website URL (after deployment)
            </label>
            <input
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://your-site.netlify.app"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 URL QR codes will redirect to: {websiteUrl}/site/[site-id]
            </p>
          </div>

          {/* QR Type Selector */}
          <div className="glass-card rounded-xl p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              QR Code Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setQrType('url')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  qrType === 'url'
                    ? 'border-nepal-blue bg-nepal-blue/10 text-nepal-blue'
                    : 'border-gray-200 hover:border-nepal-blue/50'
                }`}
              >
                <Globe className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-semibold">URL Only</div>
                <div className="text-xs opacity-70">Opens website</div>
              </button>
              <button
                onClick={() => setQrType('data')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  qrType === 'data'
                    ? 'border-nepal-red bg-nepal-red/10 text-nepal-red'
                    : 'border-gray-200 hover:border-nepal-red/50'
                }`}
              >
                <Database className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-semibold">Data Only</div>
                <div className="text-xs opacity-70">For app scanner</div>
              </button>
              <button
                onClick={() => setQrType('both')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  qrType === 'both'
                    ? 'border-green-600 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-500'
                }`}
              >
                <QrCode className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-semibold">Both</div>
                <div className="text-xs opacity-70">Best option!</div>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search heritage sites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Download All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <button
            onClick={handleDownloadAll}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download All QR Codes
          </button>
        </motion.div>

        {/* QR Code Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-2xl p-6 hover:shadow-xl transition-shadow"
            >
              {/* Site Info */}
              <div className="mb-4">
                {site.unescoStatus && (
                  <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full mb-2">
                    ⭐ UNESCO Site
                  </span>
                )}
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  {site.name}
                </h3>
                <p className="text-sm text-gray-600">📍 {site.location}</p>
              </div>

              {/* QR Codes */}
              {(qrType === 'url' || qrType === 'both') && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-nepal-blue" />
                    <span className="text-xs font-semibold text-gray-700">URL QR Code</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl flex justify-center">
                    <QRCodeSVG
                      id={`qr-url-${site.id}`}
                      value={`${websiteUrl}/site/${site.id}`}
                      size={180}
                      level="M"
                      includeMargin={true}
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">Scan → Opens Website</p>
                  {qrType === 'url' && (
                    <button
                      onClick={() => handleDownload(site, 'url')}
                      className="w-full btn-secondary flex items-center justify-center gap-2 mt-3"
                    >
                      <Download className="w-4 h-4" />
                      Download URL QR
                    </button>
                  )}
                </div>
              )}

              {(qrType === 'data' || qrType === 'both') && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-nepal-red" />
                    <span className="text-xs font-semibold text-gray-700">Data QR Code</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl flex justify-center">
                    <QRCodeSVG
                      id={`qr-data-${site.id}`}
                      value={JSON.stringify({
                        app: "heritage",
                        id: site.id,
                        name: site.name,
                        location: site.location,
                        url: `${websiteUrl}/site/${site.id}`
                      })}
                      size={180}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">Scan → View Info</p>
                  {qrType === 'data' && (
                    <button
                      onClick={() => handleDownload(site, 'data')}
                      className="w-full btn-secondary flex items-center justify-center gap-2 mt-3"
                    >
                      <Download className="w-4 h-4" />
                      Download Data QR
                    </button>
                  )}
                </div>
              )}

              {/* Download Both Button */}
              {qrType === 'both' && (
                <button
                  onClick={() => handleDownload(site, 'both')}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Both QR Codes
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredSites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No heritage sites found matching your search.</p>
          </div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mt-12 space-y-6"
        >
          {/* Two Types Explained */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              🎯 Two Types of QR Codes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-nepal-blue/10 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-nepal-blue" />
                  <strong className="text-nepal-blue">URL QR Code</strong>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✅ Opens website directly</li>
                  <li>✅ Works with any QR scanner</li>
                  <li>✅ Requires internet connection</li>
                  <li>✅ Best for public sharing</li>
                </ul>
              </div>
              <div className="p-4 bg-nepal-red/10 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-5 h-5 text-nepal-red" />
                  <strong className="text-nepal-red">Data QR Code</strong>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✅ Contains full site info</li>
                  <li>✅ Works offline</li>
                  <li>✅ For your app scanner</li>
                  <li>✅ Instant information</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              📋 How to Use QR Codes
            </h3>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="font-bold text-nepal-red">1.</span>
                <span><strong>Enter your website URL</strong> above (after deployment)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-nepal-red">2.</span>
                <span><strong>Choose QR type:</strong> URL, Data, or Both (recommended)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-nepal-red">3.</span>
                <span><strong>Download</strong> the QR codes for your heritage sites</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-nepal-red">4.</span>
                <span><strong>Print</strong> in high quality (300 DPI or higher)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-nepal-red">5.</span>
                <span><strong>Laminate</strong> for weather protection</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-nepal-red">6.</span>
                <span><strong>Mount</strong> at heritage site entrances or information boards</span>
              </li>
            </ol>
          </div>

          <div className="glass-card rounded-2xl p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
            <p className="text-sm text-gray-700">
              <strong>💡 Best Practice:</strong> Use BOTH types of QR codes! Place them side by side:
              <br />
              <strong>• URL QR</strong> for visitors to open the website on any device
              <br />
              <strong>• Data QR</strong> for your app users to get instant offline information
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default QRGeneratorPage;
