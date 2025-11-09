import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Star, Calendar, Trash2 } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { getSiteById } from '../data/heritageSites';

function FavoritesPage() {
  const { favorites, toggleFavorite, clearFavorites, favoriteCount } = useFavorites();
  const favoriteSites = favorites.map(id => getSiteById(id)).filter(Boolean);

  if (favoriteCount === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[60vh]"
        >
          <div className="glass-card rounded-3xl p-12 max-w-md text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-nepal-red" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">No Favorites Yet</h2>
            <p className="text-gray-600 mb-6">
              Start exploring and save your favorite heritage sites here!
            </p>
            <Link to="/explore">
              <button className="btn-primary px-8 py-3">
                Explore Sites
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Favorites</h2>
            <p className="text-gray-600">
              {favoriteCount} {favoriteCount === 1 ? 'site' : 'sites'} saved
            </p>
          </div>
          {favoriteCount > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Remove all favorites?')) {
                  clearFavorites();
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors text-sm font-semibold"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </motion.div>

      {/* Favorites Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4"
      >
        {favoriteSites.map((site, index) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={site.images[0]}
                  alt={site.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Remove Favorite Button */}
                <button
                  onClick={() => toggleFavorite(site.id)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-5 h-5 text-nepal-red fill-nepal-red" />
                </button>

                {site.unescoStatus && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 fill-current" />
                    UNESCO
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                    {site.name}
                  </h3>
                  <div className="flex items-center gap-1 text-white/90 text-sm">
                    <MapPin className="w-4 h-4" />
                    {site.location}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {site.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-nepal-red bg-nepal-red/10 px-3 py-1.5 rounded-full">
                    {site.type}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {site.builtYear}
                  </div>
                </div>

                <Link to={`/site/${site.id}`}>
                  <button className="btn-primary w-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default FavoritesPage;
