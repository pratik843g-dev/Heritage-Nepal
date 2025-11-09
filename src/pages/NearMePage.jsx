import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Loader, AlertCircle, Star, Calendar } from 'lucide-react';
import { getAllSites } from '../data/heritageSites';

function NearMePage() {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearbySites, setNearbySites] = useState([]);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        calculateDistances(location);
        setLoading(false);
      },
      (error) => {
        console.error('Location error:', error);
        setError('Unable to get your location. Please enable location services.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const calculateDistances = (userLoc) => {
    const sites = getAllSites();
    const sitesWithDistance = sites.map(site => ({
      ...site,
      distance: calculateDistance(
        userLoc.lat,
        userLoc.lng,
        site.coordinates.lat,
        site.coordinates.lng
      )
    }));

    // Sort by distance (nearest first)
    sitesWithDistance.sort((a, b) => a.distance - b.distance);
    setNearbySites(sitesWithDistance);
  };

  const getDirections = (site) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${site.coordinates.lat},${site.coordinates.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const formatDistance = (km) => {
    if (km < 1) {
      return `${Math.round(km * 1000)} meters`;
    }
    return `${km.toFixed(1)} km`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader className="w-12 h-12 text-nepal-red animate-spin mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Finding your location...
          </h3>
          <p className="text-gray-600 text-center">
            Please allow location access to find heritage sites near you
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="glass-card rounded-2xl p-8 max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Location Access Required
            </h3>
            <p className="text-gray-600 text-center mb-6">
              {error}
            </p>
            <button
              onClick={getUserLocation}
              className="btn-primary w-full"
            >
              Try Again
            </button>
            <Link to="/explore" className="block text-center mt-4 text-sm text-nepal-red hover:underline">
              Browse All Sites Instead
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nearestSite = nearbySites[0];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Heritage Sites Near You</h2>
        <p className="text-gray-600">
          Discover sacred sites in your area
        </p>
      </motion.div>

      {/* Nearest Site Highlight */}
      {nearestSite && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-6 mb-6 bg-gradient-to-br from-nepal-red/10 to-nepal-blue/10 border-2 border-nepal-red/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-nepal-red flex items-center justify-center flex-shrink-0">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Nearest Heritage Site
              </h3>
              <p className="text-2xl font-bold text-nepal-red mb-2">
                {nearestSite.name}
              </p>
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{nearestSite.location}</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  📍 {formatDistance(nearestSite.distance)} away
                </div>
                {nearestSite.unescoStatus && (
                  <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    UNESCO
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => getDirections(nearestSite)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
                <Link to={`/site/${nearestSite.id}`} className="btn-secondary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* All Sites by Distance */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          All Sites (sorted by distance)
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-3"
      >
        {nearbySites.map((site, index) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="glass-card rounded-xl p-4 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <img
                  src={site.images[0]}
                  alt={site.name}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-gray-900 line-clamp-1">
                      {site.name}
                    </h4>
                    <div className="bg-nepal-blue/10 text-nepal-blue px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                      {formatDistance(site.distance)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{site.location}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => getDirections(site)}
                      className="text-xs bg-nepal-red text-white px-3 py-1.5 rounded-lg hover:bg-nepal-red/90 transition flex items-center gap-1"
                    >
                      <Navigation className="w-3 h-3" />
                      Directions
                    </button>
                    <Link
                      to={`/site/${site.id}`}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Your Location Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-4 mt-6 bg-blue-50/50"
      >
        <p className="text-xs text-gray-600 text-center">
          📍 Your location: {userLocation?.lat.toFixed(4)}, {userLocation?.lng.toFixed(4)}
        </p>
        <p className="text-xs text-gray-500 text-center mt-1">
          Distances are calculated as the crow flies. Actual travel distance may vary.
        </p>
      </motion.div>
    </div>
  );
}

export default NearMePage;
