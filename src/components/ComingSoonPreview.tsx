'use client';

import { ChevronRight, Calendar } from 'lucide-react';
import { useUpcomingMovies } from '@/hooks/useMovies';
import LoadingSpinner from './LoadingSpinner';
import MovieCard from './MovieCard';
import Link from 'next/link';

export default function ComingSoonPreview() {
  const { movies, loading, error } = useUpcomingMovies();

  return (
    <section className="mb-6 md:mb-8 w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-white text-lg md:text-xl font-bold flex items-center gap-2">
          <Calendar size={24} className="text-blue-500" />
          Coming Soon
        </h3>
        <Link 
          href="#" 
          onClick={() => {
            // This will be handled by the sidebar navigation
            const event = new CustomEvent('sectionChange', { detail: 'coming-soon' });
            window.dispatchEvent(event);
          }}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
        >
          View All
          <ChevronRight size={20} />
        </Link>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-gray-400 text-sm text-center py-4">
          Unable to load upcoming movies
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {movies.filter(movie => {
            if (!movie.release_date) return false;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const releaseDate = new Date(movie.release_date);
            return releaseDate >= today;
          }).slice(0, 6).map((movie) => (
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