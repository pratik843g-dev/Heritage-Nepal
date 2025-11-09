import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Calendar, Filter } from 'lucide-react';
import { getAllSites, searchSites } from '../data/heritageSites';

function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const allSites = getAllSites();
  
  const filteredSites = searchQuery
    ? searchSites(searchQuery)
    : filterType === 'all'
    ? allSites
    : allSites.filter(site => {
        if (filterType === 'unesco') return site.unescoStatus;
        return site.type.toLowerCase().includes(filterType);
      });

  const filterOptions = [
    { value: 'all', label: 'All Sites' },
    { value: 'unesco', label: 'UNESCO' },
    { value: 'temple', label: 'Temples' },
    { value: 'stupa', label: 'Stupas' },
    { value: 'palace', label: 'Palaces' },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Heritage</h2>
        <p className="text-gray-600">
          Discover {allSites.length} sacred sites across Nepal
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-4 mb-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search sites by name, location, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nepal-red/50 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Filter Chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide"
      >
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilterType(option.value)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
              filterType === option.value
                ? 'bg-nepal-red text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-nepal-red'
            }`}
          >
            {option.label}
          </button>
        ))}
      </motion.div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Found {filteredSites.length} {filteredSites.length === 1 ? 'site' : 'sites'}
      </div>

      {/* Sites Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4"
      >
        {filteredSites.map((site, index) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link to={`/site/${site.id}`}>
              <div className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={site.images[0]}
                    alt={site.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {site.unescoStatus && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
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
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-nepal-red bg-nepal-red/10 px-3 py-1.5 rounded-full">
                      {site.type}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {site.builtYear}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {filteredSites.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card rounded-2xl p-12 text-center"
        >
          <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No sites found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterType('all');
            }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default ExplorePage;
