import { useState, useEffect, useCallback } from 'react';
import { tmdbService, TMDBMovie, TMDBResponse } from '@/lib/tmdb';

export interface UseSearchResult {
  movies: TMDBMovie[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  search: (query: string) => void;
  loadMore: () => void;
  clearSearch: () => void;
  query: string;
}

export const useSearch = (): UseSearchResult => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [query, setQuery] = useState('');

  const searchMovies = useCallback(async (searchQuery: string, pageNum: number = 1, append: boolean = false) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setHasMore(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response: TMDBResponse<TMDBMovie> = await tmdbService.searchMovies(searchQuery, pageNum);
      
      if (append) {
        setMovies(prev => [...prev, ...response.results]);
      } else {
        setMovies(response.results);
      }
      
      setHasMore(pageNum < response.total_pages);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search movies');
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    setHasMore(false);
    searchMovies(searchQuery, 1, false);
  }, [searchMovies]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore && query) {
      searchMovies(query, page + 1, true);
    }
  }, [loading, hasMore, query, page, searchMovies]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setMovies([]);
    setPage(1);
    setHasMore(false);
    setError(null);
  }, []);

  return {
    movies,
    loading,
    error,
    hasMore,
    search,
    loadMore,
    clearSearch,
    query,
  };
};
