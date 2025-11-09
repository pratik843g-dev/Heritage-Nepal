import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Clock, DollarSign, Calendar, 
  Star, Info, Building2, Lightbulb, Navigation, Share2,
  CheckCircle2, Heart
} from 'lucide-react';
import { getSiteById } from '../data/heritageSites';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';

function SiteDetailPage() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const site = getSiteById(siteId);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(siteId);

  if (!site) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Site Not Found</h2>
        <p className="text-gray-600 mb-6">The heritage site you're looking for doesn't exist.</p>
        <Link to="/explore" className="btn-primary">
          Explore All Sites
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: site.name,
        text: site.description,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[40vh] overflow-hidden">
        <img
          src={site.images[0]}
          alt={site.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 glass-card p-3 rounded-xl hover:bg-white/90 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          {/* Favorite Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(siteId)}
            className={`glass-card p-3 rounded-xl transition-all ${
              favorited 
                ? 'bg-nepal-red/90 hover:bg-nepal-red' 
                : 'hover:bg-white/90'
            }`}
          >
            <Heart 
              className={`w-6 h-6 ${
                favorited 
                  ? 'text-white fill-white' 
                  : 'text-gray-900'
              }`}
            />
          </motion.button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="glass-card p-3 rounded-xl hover:bg-white/90 transition-all"
          >
            {copied ? (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            ) : (
              <Share2 className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {site.unescoStatus && (
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold mb-3">
                <Star className="w-4 h-4 fill-current" />
                UNESCO World Heritage Site
              </div>
            )}
            <h1 className="text-3xl font-bold text-white mb-2">{site.name}</h1>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-5 h-5" />
              <span>{site.location}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <div className="glass-card rounded-xl p-4">
            <Clock className="w-5 h-5 text-nepal-red mb-2" />
            <div className="text-xs text-gray-600 mb-1">Timings</div>
            <div className="text-sm font-semibold text-gray-900">{site.timings}</div>
          </div>
          <div className="glass-card rounded-xl p-4">
            <DollarSign className="w-5 h-5 text-nepal-red mb-2" />
            <div className="text-xs text-gray-600 mb-1">Entry Fee</div>
            <div className="text-sm font-semibold text-gray-900">{site.entryFee}</div>
          </div>
          <div className="glass-card rounded-xl p-4">
            <Calendar className="w-5 h-5 text-nepal-red mb-2" />
            <div className="text-xs text-gray-600 mb-1">Built Year</div>
            <div className="text-sm font-semibold text-gray-900">{site.builtYear}</div>
          </div>
          <div className="glass-card rounded-xl p-4">
            <Building2 className="w-5 h-5 text-nepal-red mb-2" />
            <div className="text-xs text-gray-600 mb-1">Type</div>
            <div className="text-sm font-semibold text-gray-900">{site.type}</div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-nepal-red" />
            <h2 className="text-xl font-bold text-gray-900">About</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{site.description}</p>
        </motion.div>

        {/* Significance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-nepal-red" />
            <h2 className="text-xl font-bold text-gray-900">Significance</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{site.significance}</p>
        </motion.div>

        {/* Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-nepal-red" />
            <h2 className="text-xl font-bold text-gray-900">Architecture</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{site.architecture}</p>
        </motion.div>

        {/* Interesting Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-nepal-red" />
            <h2 className="text-xl font-bold text-gray-900">Interesting Facts</h2>
          </div>
          <ul className="space-y-3">
            {site.facts.map((fact, index) => (
              <li key={index} className="flex gap-3 text-gray-700">
                <span className="text-nepal-red font-bold flex-shrink-0">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Best Time to Visit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6 mb-6 bg-gradient-to-br from-nepal-red/5 to-nepal-blue/5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-nepal-red" />
            <h3 className="font-bold text-gray-900">Best Time to Visit</h3>
          </div>
          <p className="text-gray-700">{site.bestTimeToVisit}</p>
        </motion.div>

        {/* Nearby Attractions */}
        {site.nearbyAttractions && site.nearbyAttractions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Navigation className="w-5 h-5 text-nepal-red" />
              <h2 className="text-xl font-bold text-gray-900">Nearby Attractions</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {site.nearbyAttractions.map((attraction, index) => (
                <span
                  key={index}
                  className="bg-nepal-blue/10 text-nepal-blue px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {attraction}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* QR Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Share this Site</h3>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Generate QR codes for visitors to scan
          </p>
          <button
            onClick={() => setShowQR(!showQR)}
            className="btn-secondary mx-auto block"
          >
            {showQR ? 'Hide QR Codes' : 'Show QR Codes'}
          </button>
          
          {showQR && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 grid md:grid-cols-2 gap-6"
            >
              {/* URL QR Code */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-nepal-blue/20 flex items-center justify-center">
                    <span className="text-xl">🌐</span>
                  </div>
                  <h4 className="font-bold text-gray-900">URL QR Code</h4>
                </div>
                <QRCodeSVG
                  id="qr-url"
                  value={window.location.href}
                  size={200}
                  level="M"
                  includeMargin={true}
                  className="mx-auto"
                />
                <p className="text-xs text-gray-600 mt-3 text-center">Opens website directly</p>
                <button
                  onClick={() => {
                    const svg = document.getElementById('qr-url');
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
                      link.download = `${site.id}-url-qr.png`;
                      link.href = canvas.toDataURL('image/png');
                      link.click();
                    };
                    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
                  }}
                  className="mt-3 w-full btn-secondary text-xs"
                >
                  Download URL QR
                </button>
              </div>

              {/* Data QR Code */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-nepal-red/20 flex items-center justify-center">
                    <span className="text-xl">💾</span>
                  </div>
                  <h4 className="font-bold text-gray-900">Data QR Code</h4>
                </div>
                <QRCodeSVG
                  id="qr-data"
                  value={JSON.stringify({
                    app: "heritage",
                    id: site.id,
                    name: site.name,
                    location: site.location,
                    url: window.location.href
                  })}
                  size={200}
                  level="H"
                  includeMargin={true}
                  className="mx-auto"
                />
                <p className="text-xs text-gray-600 mt-3 text-center">Quick site identifier</p>
                <button
                  onClick={() => {
                    const svg = document.getElementById('qr-data');
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
                      link.download = `${site.id}-data-qr.png`;
                      link.href = canvas.toDataURL('image/png');
                      link.click();
                    };
                    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
                  }}
                  className="mt-3 w-full btn-secondary text-xs"
                >
                  Download Data QR
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 gap-4 pb-4"
        >
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${site.coordinates.lat},${site.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Navigation className="w-5 h-5" />
            Get Directions
          </a>
          <Link to="/explore" className="btn-secondary flex items-center justify-center gap-2">
            Explore More
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default SiteDetailPage;
