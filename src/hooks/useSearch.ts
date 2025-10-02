import { useState, useCallback } from 'react';
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
  totalResults: number;
}

export const useSearch = (): UseSearchResult => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [query, setQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);

  const searchMovies = useCallback(async (searchQuery: string, pageNum: number = 1, append: boolean = false) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setHasMore(false);
      setTotalResults(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Fetch multiple pages to get more results for better pagination
      const maxPages = Math.min(5, pageNum + 4); // Fetch up to 5 pages
      const promises = [];
      
      for (let i = 1; i <= maxPages; i++) {
        promises.push(tmdbService.searchMovies(searchQuery, i));
      }
      
      const responses = await Promise.all(promises);
      const allMovies = responses.flatMap(response => response.results);
      
      // Remove duplicates
      const uniqueMovies = allMovies.filter((movie, index, self) => 
        index === self.findIndex(m => m.id === movie.id)
      );
      
      if (append) {
        setMovies(prev => {
          const combined = [...prev, ...uniqueMovies];
          return combined.filter((movie, index, self) => 
            index === self.findIndex(m => m.id === movie.id)
          );
        });
      } else {
        setMovies(uniqueMovies);
      }
      
      const firstResponse = responses[0];
      setTotalResults(firstResponse.total_results);
      setHasMore(pageNum < firstResponse.total_pages);
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
    setTotalResults(0);
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
    totalResults,
  };
};
