'use client';

import { Play, Pause, Volume2, ChevronRight } from 'lucide-react';
import { useNowPlayingMovies } from '@/hooks/useMovies';
import { getBackdropUrl } from '@/lib/tmdb';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';

export default function ContinueWatching() {
  const { movies, loading, error } = useNowPlayingMovies();
  return (
    <section className="mb-6 md:mb-8 w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-white text-lg md:text-xl font-bold">Continue Watching</h3>
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
          Unable to load continue watching content
        </div>
      ) : (
        <div className="flex space-x-3 md:space-x-4 overflow-x-auto pb-4 scrollbar-hide max-w-full">
          {movies.slice(0, 6).map((movie, index) => {
            const backdropUrl = getBackdropUrl(movie.backdrop_path, 'w780');
            const hasProgress = index % 2 === 0; // Alternate between progress and play button
            const progressPercent = hasProgress ? Math.floor(Math.random() * 80) + 10 : 0;
            
            return (
              <Link key={movie.id} href={`/movie/${movie.id}`} className="flex-shrink-0 w-64 md:w-80 h-36 md:h-48 bg-gray-800 rounded-lg overflow-hidden relative block">
                <img 
                  src={backdropUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {hasProgress ? (
                  /* Progress Overlay */
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                    <div className="flex items-center space-x-1 md:space-x-2 mb-2">
                      <button className="text-white">
                        <Pause size={14} className="md:w-4 md:h-4" />
                      </button>
                      <div className="flex-1 bg-gray-600 rounded-full h-1">
                        <div 
                          className="bg-red-600 h-1 rounded-full relative" 
                          style={{ width: `${progressPercent}%` }}
                        >
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 bg-red-600 rounded-full"></div>
                        </div>
                      </div>
                      <span className="text-white text-xs md:text-sm">
                        {Math.floor(progressPercent * 0.02)}:{String(Math.floor((progressPercent * 0.02) % 1 * 60)).padStart(2, '0')}
                      </span>
                      <span className="text-gray-400 text-xs md:text-sm">/</span>
                      <span className="text-gray-400 text-xs md:text-sm">02:30</span>
                      <button className="text-white hidden md:block">
                        <Volume2 size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Play Button Overlay */
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play size={20} className="md:w-6 md:h-6 text-white ml-1" />
                    </button>
                  </div>
                )}
                
                {/* Title and Year */}
                <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3">
                  <h4 className="text-white font-semibold mb-1 text-sm md:text-base">
                    {movie.title.length > (window.innerWidth < 768 ? 15 : 20) ? movie.title.substring(0, window.innerWidth < 768 ? 15 : 20).toUpperCase() + '...' : movie.title.toUpperCase()}
                  </h4>
                  <p className="text-gray-300 text-xs md:text-sm">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
