import { useState, useEffect } from 'react';
import { tmdbService, TMDBMovieDetails, TMDBMovie } from '@/lib/tmdb';

export interface UseMovieDetailsResult {
  movie: TMDBMovieDetails | null;
  similarMovies: TMDBMovie[];
  recommendedMovies: TMDBMovie[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export const useMovieDetails = (movieId: number | null): UseMovieDetailsResult => {
  const [movie, setMovie] = useState<TMDBMovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<TMDBMovie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetails = async () => {
    if (!movieId) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch movie details, similar movies, and recommendations in parallel
      const [movieDetails, similarResponse, recommendedResponse] = await Promise.all([
        tmdbService.getMovieDetails(movieId),
        tmdbService.getSimilarMovies(movieId),
        tmdbService.getRecommendedMovies(movieId),
      ]);

      setMovie(movieDetails);
      setSimilarMovies(similarResponse.results.slice(0, 6)); // Limit to 6 similar movies
      setRecommendedMovies(recommendedResponse.results.slice(0, 6)); // Limit to 6 recommended movies
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    if (movieId) {
      fetchMovieDetails();
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  return {
    movie,
    similarMovies,
    recommendedMovies,
    loading,
    error,
    refresh,
  };
};
