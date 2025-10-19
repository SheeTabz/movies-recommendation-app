'use client';

import { ChevronRight, TrendingUp } from 'lucide-react';
import { usePopularMovies } from '@/hooks/useMovies';
import LoadingSpinner from './LoadingSpinner';
import MovieCard from './MovieCard';

export default function TrendingMovies() {
  const { movies, loading, error } = usePopularMovies();

  return (
    <section className="mb-6 md:mb-8 w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-white text-lg md:text-xl font-bold flex items-center gap-2">
          <TrendingUp size={24} className="text-red-500" />
          Trending Movies
        </h3>
        <button className="text-gray-400 hover:text-white transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-gray-400 text-sm text-center py-4">
          Unable to load trending movies
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {movies.slice(0, 12).map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              badge={{
                text: `#${index + 1}`,
                color: 'bg-red-600'
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}