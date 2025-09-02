'use client';

import { Play, ChevronRight } from 'lucide-react';
import { useUpcomingMovies } from '@/hooks/useMovies';
import { getBackdropUrl, getPosterUrl } from '@/lib/tmdb';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';

export default function ComingSoon() {
  const { movies, loading, error } = useUpcomingMovies();

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
        <h2 className="text-3xl font-bold text-white mb-8">Coming Soon</h2>
        <div className="text-center text-gray-400 py-10">
          Unable to load upcoming movies
        </div>
      </section>
    );
  }

  // Take the first two movies for the side-by-side layout
  const featuredMovies = movies.slice(0, 2);
  // Take more movies for the animation carousel
  const animationMovies = movies.slice(2, 8);

  return (
    <div className="py-8">
      {/* Coming Soon Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8">Coming Soon</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredMovies.map((movie, index) => {
            const backdropUrl = getBackdropUrl(movie.backdrop_path, 'w1280');
            const releaseDate = movie.release_date ? new Date(movie.release_date) : null;
            const releaseMonth = releaseDate ? releaseDate.toLocaleDateString('en-US', { month: 'long' }) : 'TBA';
            const releaseYear = releaseDate ? releaseDate.getFullYear() : 'TBA';
            
            return (
              <Link key={movie.id} href={`/movie/${movie.id}`} className="group">
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  {/* Background Image */}
                  <img 
                    src={backdropUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    {/* Coming Soon Badge */}
                    <div className="mb-4">
                      <span className="bg-red-600 text-white px-4 py-2 btn-rounded text-sm font-semibold">
                        Coming Soon
                      </span>
                    </div>
                    
                    {/* Release Date */}
                    <div className="mb-4">
                      <p className="text-white text-lg font-medium">
                        On {releaseMonth}, {releaseYear}
                      </p>
                    </div>
                    
                    {/* Movie Title */}
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {movie.title}
                      </h3>
                      <p className="text-gray-200 text-sm line-clamp-2">
                        {movie.overview}
                      </p>
                    </div>
                    
                    {/* Watch Button */}
                    <div>
                      <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 btn-rounded font-semibold hover:bg-red-700 transition-colors">
                        <Play size={20} />
                        Watch Thriller
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Top Upcoming Animation Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Top Upcoming Animation</h2>
          <button className="text-gray-400 hover:text-white transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {animationMovies.map((movie) => {
            const posterUrl = getPosterUrl(movie.poster_path, 'w342');
            const releaseDate = movie.release_date ? new Date(movie.release_date) : null;
            const releaseYear = releaseDate ? releaseDate.getFullYear() : 'TBA';
            
            return (
              <Link key={movie.id} href={`/movie/${movie.id}`} className="flex-shrink-0 w-48 group">
                <div className="relative w-full h-64 bg-gray-700 rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-200">
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-xs">
                  Adventure • Animation
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
