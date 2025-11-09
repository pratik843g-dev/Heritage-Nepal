import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('heritage_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('heritage_favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const toggleFavorite = (siteId) => {
    setFavorites(prev =>
      prev.includes(siteId)
        ? prev.filter(id => id !== siteId)
        : [...prev, siteId]
    );
  };

  const isFavorite = (siteId) => favorites.includes(siteId);

  const clearFavorites = () => setFavorites([]);

  return { 
    favorites, 
    toggleFavorite, 
    isFavorite, 
    clearFavorites,
    favoriteCount: favorites.length 
  };
}
