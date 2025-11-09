import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Loader, AlertCircle, Star, Calendar, Map, Target } from 'lucide-react';
import { getAllSites } from '../data/heritageSites';

function NearMePage() {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearbySites, setNearbySites] = useState([]);
  const [demoMode, setDemoMode] = useState(false);
  
  // Demo location: Thamel, Kathmandu (tourist area)
  const DEMO_LOCATION = { lat: 27.7155, lng: 85.3124 };

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
        setError('Unable to get your location. Please enable location services or try demo mode.');
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

  const startDemoMode = () => {
    setDemoMode(true);
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setUserLocation(DEMO_LOCATION);
      calculateDistances(DEMO_LOCATION);
      setLoading(false);
    }, 1000);
  };

  const getDirections = (site) => {
    const location = userLocation || DEMO_LOCATION;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${site.coordinates.lat},${site.coordinates.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const viewOnMap = (site) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${site.coordinates.lat},${site.coordinates.lng}`;
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[60vh]"
        >
          <div className="glass-card rounded-3xl p-8 max-w-md border-2 border-nepal-red/10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-nepal-red" />
              </div>
            </motion.div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              Location Access Needed
            </h3>
            <p className="text-gray-600 text-center mb-6">
              {error}
            </p>
            
            <div className="space-y-3">
              <button
                onClick={getUserLocation}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                Enable Location
              </button>
              
              <button
                onClick={startDemoMode}
                className="w-full py-3 bg-gradient-to-r from-nepal-blue/10 to-nepal-red/10 hover:from-nepal-blue/20 hover:to-nepal-red/20 text-gray-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-nepal-blue/20"
              >
                <Map className="w-5 h-5" />
                Try Demo Mode
              </button>
              
              <Link to="/explore" className="block">
                <button className="btn-secondary w-full py-3">
                  Browse All Sites
                </button>
              </Link>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-xs text-gray-600 text-center">
                <strong>Demo Mode</strong> uses Thamel (central Kathmandu) as your location to show how the feature works.
              </p>
            </div>
          </div>
        </motion.div>
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

      {/* Demo Mode Banner */}
      {demoMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-4 mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Map className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">Demo Mode Active</p>
              <p className="text-xs text-gray-600">Showing sites near Thamel, Kathmandu</p>
            </div>
            <button
              onClick={getUserLocation}
              className="text-xs px-3 py-1.5 bg-white hover:bg-gray-50 rounded-lg text-blue-600 font-medium transition-colors"
            >
              Use My Location
            </button>
          </div>
        </motion.div>
      )}

      {/* Nearest Site Highlight */}
      {nearestSite && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl overflow-hidden mb-6 border-2 border-nepal-red/20 shadow-xl"
        >
          {/* Site Image Background */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={nearestSite.images[0]}
              alt={nearestSite.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="absolute top-4 right-4"
            >
              <div className="bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-green-700">
                  {formatDistance(nearestSite.distance)} away
                </span>
              </div>
            </motion.div>

            {/* UNESCO Badge */}
            {nearestSite.unescoStatus && (
              <div className="absolute top-4 left-4">
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Star className="w-3 h-3 fill-current" />
                  UNESCO
                </div>
              </div>
            )}

            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-sm text-white/80 mb-1 font-medium">📍 Nearest Heritage Site</p>
              <h3 className="text-2xl font-bold text-white mb-1">{nearestSite.name}</h3>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <MapPin className="w-4 h-4" />
                {nearestSite.location}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gradient-to-br from-nepal-red/5 to-nepal-blue/5">
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => getDirections(nearestSite)}
                className="btn-primary py-3 flex flex-col items-center justify-center gap-1"
              >
                <Navigation className="w-5 h-5" />
                <span className="text-xs">Directions</span>
              </button>
              <button
                onClick={() => viewOnMap(nearestSite)}
                className="py-3 bg-nepal-blue/10 hover:bg-nepal-blue/20 text-nepal-blue font-semibold rounded-xl transition-all flex flex-col items-center justify-center gap-1"
              >
                <Map className="w-5 h-5" />
                <span className="text-xs">View Map</span>
              </button>
              <Link to={`/site/${nearestSite.id}`} className="contents">
                <button className="btn-secondary py-3 flex flex-col items-center justify-center gap-1">
                  <Star className="w-5 h-5" />
                  <span className="text-xs">Details</span>
                </button>
              </Link>
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
        className="space-y-3 pb-4"
      >
        {nearbySites.map((site, index) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all border border-gray-100">
              <div className="flex items-start gap-0">
                {/* Site Image */}
                <div className="relative w-24 h-24 flex-shrink-0">
                  <img
                    src={site.images[0]}
                    alt={site.name}
                    className="w-full h-full object-cover"
                  />
                  {index === 0 && (
                    <div className="absolute top-1 left-1">
                      <div className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                        NEAREST
                      </div>
                    </div>
                  )}
                  {site.unescoStatus && (
                    <div className="absolute bottom-1 left-1">
                      <div className="bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Site Info */}
                <div className="flex-1 min-w-0 p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-gray-900 line-clamp-1 text-sm">
                      {site.name}
                    </h4>
                    <div className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                      site.distance < 5 
                        ? 'bg-green-100 text-green-700' 
                        : site.distance < 15 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {formatDistance(site.distance)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2.5">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{site.location}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => getDirections(site)}
                      className="text-xs bg-nepal-red text-white px-3 py-1.5 rounded-lg hover:bg-nepal-red/90 transition-all flex items-center gap-1 font-semibold shadow-sm"
                    >
                      <Navigation className="w-3 h-3" />
                      Go
                    </button>
                    <button
                      onClick={() => viewOnMap(site)}
                      className="text-xs bg-nepal-blue/10 text-nepal-blue px-3 py-1.5 rounded-lg hover:bg-nepal-blue/20 transition-all flex items-center gap-1 font-semibold"
                    >
                      <Map className="w-3 h-3" />
                      Map
                    </button>
                    <Link to={`/site/${site.id}`}>
                      <button className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-all font-semibold">
                        Info
                      </button>
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
