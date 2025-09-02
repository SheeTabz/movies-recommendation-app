import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
  popularity: number;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export const tmdbService = {
  // Get trending movies
  getTrendingMovies: async (page: number = 1): Promise<TMDBResponse<TMDBMovie>> => {
    const response = await tmdbApi.get('/trending/movie/week', {
      params: { page }
    });
    return response.data;
  },

  // Search movies
  searchMovies: async (query: string, page: number = 1): Promise<TMDBResponse<TMDBMovie>> => {
    const response = await tmdbApi.get('/search/movie', {
      params: { query, page }
    });
    return response.data;
  },

  // Get movie details
  getMovieDetails: async (movieId: number) => {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,images'
      }
    });
    return response.data;
  },

  // Get popular movies
  getPopularMovies: async (page: number = 1): Promise<TMDBResponse<TMDBMovie>> => {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page }
    });
    return response.data;
  },

  // Get movie genres
  getGenres: async () => {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data;
  },

  // Get image URL
  getImageUrl: (path: string, size: string = 'w500') => {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
};
