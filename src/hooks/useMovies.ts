import { useState, useEffect } from 'react';
import { tmdbService, TMDBMovie, TMDBResponse } from '@/lib/tmdb';

export interface UseMoviesResult {
  movies: TMDBMovie[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export const usePopularMovies = (): UseMoviesResult => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNum: number = 1, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: TMDBResponse<TMDBMovie> = await tmdbService.getPopularMovies(pageNum);
      
      if (append) {
        setMovies(prev => [...prev, ...response.results]);
      } else {
        setMovies(response.results);
      }
      
      setHasMore(pageNum < response.total_pages);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchMovies(page + 1, true);
    }
  };

  const refresh = () => {
    setPage(1);
    setHasMore(true);
    fetchMovies(1, false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, loading, error, hasMore, loadMore, refresh };
};

export const useTopRatedMovies = (): UseMoviesResult => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNum: number = 1, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: TMDBResponse<TMDBMovie> = await tmdbService.getTopRatedMovies(pageNum);
      
      if (append) {
        setMovies(prev => [...prev, ...response.results]);
      } else {
        setMovies(response.results);
      }
      
      setHasMore(pageNum < response.total_pages);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchMovies(page + 1, true);
    }
  };

  const refresh = () => {
    setPage(1);
    setHasMore(true);
    fetchMovies(1, false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, loading, error, hasMore, loadMore, refresh };
};

export const useNowPlayingMovies = (): UseMoviesResult => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNum: number = 1, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: TMDBResponse<TMDBMovie> = await tmdbService.getNowPlayingMovies(pageNum);
      
      if (append) {
        setMovies(prev => [...prev, ...response.results]);
      } else {
        setMovies(response.results);
      }
      
      setHasMore(pageNum < response.total_pages);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchMovies(page + 1, true);
    }
  };

  const refresh = () => {
    setPage(1);
    setHasMore(true);
    fetchMovies(1, false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, loading, error, hasMore, loadMore, refresh };
};

export const useUpcomingMovies = (): UseMoviesResult => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNum: number = 1, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: TMDBResponse<TMDBMovie> = await tmdbService.getUpcomingMovies(pageNum);
      
      if (append) {
        setMovies(prev => [...prev, ...response.results]);
      } else {
        setMovies(response.results);
      }
      
      setHasMore(pageNum < response.total_pages);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchMovies(page + 1, true);
    }
  };

  const refresh = () => {
    setPage(1);
    setHasMore(true);
    fetchMovies(1, false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, loading, error, hasMore, loadMore, refresh };
};
