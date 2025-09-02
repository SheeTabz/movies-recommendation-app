'use client';

import { ChevronRight } from 'lucide-react';
import { usePopularMovies } from '@/hooks/useMovies';
import { getPosterUrl } from '@/lib/tmdb';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';

export default function HistoryPlayed() {
  const { movies, loading, error } = usePopularMovies();

  if (loading) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error || !movies.length) {
    return (
      <section className="py-8">
        <h2 className="text-3xl font-bold text-white mb-8">History Played</h2>
        <div className="text-center text-gray-400 py-10">
          Unable to load recently played content
        </div>
      </section>
    );
  }

  // Split movies into Today and Yesterday categories
  const todayMovies = movies.slice(0, 4);
  const yesterdayMovies = movies.slice(4, 8);
  const additionalMovies = movies.slice(8, 12);

  const renderMovieCard = (movie: { id: number; title: string; poster_path: string }, progressPercent: number) => {
    const posterUrl = getPosterUrl(movie.poster_path, 'w342');
    
    return (
      <Link key={movie.id} href={`/movie/${movie.id}`} className="group">
        <div className="relative w-full h-64 bg-gray-700 rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-200">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
            <div 
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
          {movie.title}
        </h3>
      </Link>
    );
  };

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-white mb-8">History Played</h2>
      
      {/* Today Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Today</h3>
          <button className="text-gray-400 hover:text-white transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {todayMovies.map((movie, index) => {
            // Generate random progress between 20-80%
            const progressPercent = Math.floor(Math.random() * 60) + 20;
            return renderMovieCard(movie, progressPercent);
          })}
        </div>
      </section>

      {/* Yesterday Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Yesterday</h3>
          <button className="text-gray-400 hover:text-white transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {yesterdayMovies.map((movie, index) => {
            // Generate random progress between 10-90%
            const progressPercent = Math.floor(Math.random() * 80) + 10;
            return renderMovieCard(movie, progressPercent);
          })}
        </div>
      </section>

      {/* Additional Movies Row */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {additionalMovies.map((movie, index) => {
            // Generate random progress between 15-85%
            const progressPercent = Math.floor(Math.random() * 70) + 15;
            return renderMovieCard(movie, progressPercent);
          })}
        </div>
      </section>
    </div>
  );
}
