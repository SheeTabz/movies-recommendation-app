import axios from 'axios';
import { config } from '@/config/env';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const TMDB_API_KEY = config.tmdb.apiKey;

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBMovieDetails extends TMDBMovie {
  genres: TMDBGenre[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
}

export const tmdbService = {
  // Get popular movies
  async getPopularMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    const response = await tmdbClient.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  },

  // Get top rated movies
  async getTopRatedMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    const response = await tmdbClient.get('/movie/top_rated', {
      params: { page },
    });
    return response.data;
  },

  // Get now playing movies
  async getNowPlayingMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    const response = await tmdbClient.get('/movie/now_playing', {
      params: { page },
    });
    return response.data;
  },

  // Get upcoming movies
  async getUpcomingMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    const response = await tmdbClient.get('/movie/upcoming', {
      params: { page },
    });
    return response.data;
  },

  // Get movie details
  async getMovieDetails(movieId: number): Promise<TMDBMovieDetails> {
    const response = await tmdbClient.get(`/movie/${movieId}`);
    return response.data;
  },

  // Search movies
  async searchMovies(query: string, page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    const response = await tmdbClient.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },

  // Get movie genres
  async getMovieGenres(): Promise<{ genres: TMDBGenre[] }> {
    const response = await tmdbClient.get('/genre/movie/list');
    return response.data;
  },

  // Get similar movies
  async getSimilarMovies(movieId: number, page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    const response = await tmdbClient.get(`/movie/${movieId}/similar`, {
      params: { page },
    });
    return response.data;
  },

  // Get recommended movies
  async getRecommendedMovies(movieId: number, page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    const response = await tmdbClient.get(`/movie/${movieId}/recommendations`, {
      params: { page },
    });
    return response.data;
  },
};

// Helper functions for image URLs
export const getImageUrl = (path: string | null, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string => {
  if (!path) return '/placeholder-backdrop.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path: string | null, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};
