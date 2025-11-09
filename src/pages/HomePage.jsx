import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scan, Compass, MapPin, Star, History, Trophy, QrCode } from 'lucide-react';
import { getAllSites } from '../data/heritageSites';

function HomePage() {
  const sites = getAllSites();
  const featuredSites = sites.slice(0, 3);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8 mb-6 bg-gradient-to-br from-nepal-red/10 to-nepal-blue/10"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Discover Nepal's Sacred Heritage
        </h2>
        <p className="text-gray-600 mb-6">
          Scan QR codes at heritage sites to unlock stories, history, and hidden treasures of Nepal's rich cultural legacy.
        </p>
        
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/scan">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Scan className="w-5 h-5" />
              Scan QR Code
            </motion.button>
          </Link>
          <Link to="/explore">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              Explore Sites
            </motion.button>
          </Link>
          <Link to="/near-me" className="col-span-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary flex items-center justify-center gap-2 bg-gradient-to-r from-nepal-blue to-nepal-blue/80 hover:from-nepal-blue/90 hover:to-nepal-blue/70"
            >
              <MapPin className="w-5 h-5" />
              Find Sites Near Me
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-4 mb-6"
      >
        <motion.div variants={item} className="glass-card rounded-2xl p-4 text-center">
          <Trophy className="w-8 h-8 text-nepal-red mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{sites.length}</div>
          <div className="text-xs text-gray-600">Heritage Sites</div>
        </motion.div>
        <motion.div variants={item} className="glass-card rounded-2xl p-4 text-center">
          <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {sites.filter(s => s.unescoStatus).length}
          </div>
          <div className="text-xs text-gray-600">UNESCO Sites</div>
        </motion.div>
        <motion.div variants={item} className="glass-card rounded-2xl p-4 text-center">
          <History className="w-8 h-8 text-nepal-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">2000+</div>
          <div className="text-xs text-gray-600">Years Old</div>
        </motion.div>
      </motion.div>

      {/* Featured Sites */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Featured Sites</h3>
          <Link to="/explore" className="text-nepal-red text-sm font-semibold hover:underline">
            View All
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {featuredSites.map((site) => (
            <motion.div key={site.id} variants={item}>
              <Link to={`/site/${site.id}`}>
                <div className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={site.images[0]}
                      alt={site.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {site.unescoStatus && (
                      <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        UNESCO
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-white font-bold text-lg mb-1">{site.name}</h4>
                      <div className="flex items-center gap-1 text-white/90 text-sm">
                        <MapPin className="w-4 h-4" />
                        {site.location}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {site.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-nepal-red bg-nepal-red/10 px-3 py-1 rounded-full">
                        {site.type}
                      </span>
                      <span className="text-xs text-gray-500">{site.builtYear}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-nepal-red text-white flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Visit a Heritage Site</h4>
              <p className="text-sm text-gray-600">Find QR codes placed at various heritage locations across Nepal.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-nepal-blue text-white flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Scan the QR Code</h4>
              <p className="text-sm text-gray-600">Use the app's scanner to scan the QR code at the site.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-nepal-red text-white flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Explore & Learn</h4>
              <p className="text-sm text-gray-600">Access detailed information, history, architecture, and fascinating facts.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default HomePage;
