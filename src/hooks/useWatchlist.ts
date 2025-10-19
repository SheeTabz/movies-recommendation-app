import { useState, useEffect, useCallback } from 'react';
import { TMDBMovie } from '@/lib/tmdb';

const WATCHLIST_KEY = 'filmax_watchlist';
const FAVORITES_KEY = 'filmax_favorites';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<TMDBMovie[]>([]);
  const [favorites, setFavorites] = useState<TMDBMovie[]>([]);

  useEffect(() => {
    const savedWatchlist = localStorage.getItem(WATCHLIST_KEY);
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToWatchlist = useCallback((movie: TMDBMovie) => {
    setWatchlist(prev => {
      const exists = prev.find(m => m.id === movie.id);
      if (exists) return prev;
      
      const updated = [...prev, movie];
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromWatchlist = useCallback((movieId: number) => {
    setWatchlist(prev => {
      const updated = prev.filter(m => m.id !== movieId);
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addToFavorites = useCallback((movie: TMDBMovie) => {
    setFavorites(prev => {
      const exists = prev.find(m => m.id === movie.id);
      if (exists) return prev;
      
      const updated = [...prev, movie];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromFavorites = useCallback((movieId: number) => {
    setFavorites(prev => {
      const updated = prev.filter(m => m.id !== movieId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isInWatchlist = useCallback((movieId: number) => {
    return watchlist.some(m => m.id === movieId);
  }, [watchlist]);

  const isInFavorites = useCallback((movieId: number) => {
    return favorites.some(m => m.id === movieId);
  }, [favorites]);

  return {
    watchlist,
    favorites,
    addToWatchlist,
    removeFromWatchlist,
    addToFavorites,
    removeFromFavorites,
    isInWatchlist,
    isInFavorites,
  };
};