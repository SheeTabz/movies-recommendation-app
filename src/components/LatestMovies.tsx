'use client';

import { ChevronRight } from 'lucide-react';
import { useNowPlayingMovies } from '@/hooks/useMovies';
import LoadingSpinner from './LoadingSpinner';
import MovieCard from './MovieCard';

export default function LatestMovies() {
  const { movies, loading, error } = useNowPlayingMovies();

  return (
    <section className="mb-6 md:mb-8 w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-white text-lg md:text-xl font-bold">Latest Movies</h3>
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
          Unable to load latest movies
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {movies.slice(0, 12).map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </section>
  );
}