'use client';

import { Play, Bookmark } from 'lucide-react';
import { usePopularMovies } from '@/hooks/useMovies';
import { useWatchlist } from '@/hooks/useWatchlist';
import { getBackdropUrl, getPosterUrl } from '@/lib/tmdb';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';
import OptimizedImage from './OptimizedImage';

export default function HeroSection() {
  const { movies, loading, error } = usePopularMovies();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  
  if (loading) {
    return (
      <section className="py-8">
        <div className="relative w-full h-[28rem] rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error || !movies.length) {
    return (
      <section className="py-8">
        <div className="relative w-full h-[28rem] rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Featured Movie</h2>
            <p className="text-gray-300">Unable to load featured content</p>
          </div>
        </div>
      </section>
    );
  }

  const featuredMovie = movies[0];
  const backdropUrl = getBackdropUrl(featuredMovie.backdrop_path, 'w1280');
  const posterUrl = getPosterUrl(featuredMovie.poster_path, 'w500');
  
  const handleWatchlistToggle = () => {
    if (isInWatchlist(featuredMovie.id)) {
      removeFromWatchlist(featuredMovie.id);
    } else {
      addToWatchlist(featuredMovie);
    }
  };

  return (
    <section className="py-4 md:py-8">
      <div className="relative w-full h-[20rem] md:h-[28rem] rounded-lg overflow-hidden">
        {/* Background Image */}
        <OptimizedImage 
          src={backdropUrl}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
          width={1280}
          height={448}
          priority={true}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent"></div>
        
        {/* Movie Tag */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-gray-600 text-white px-2 py-1 md:px-3 btn-rounded text-xs md:text-sm">
          Movie
        </div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full md:w-1/2 px-4 md:px-8">
            {/* Movie Info */}
            <div className="mb-4 md:mb-6">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3 line-clamp-2">{featuredMovie.title}</h1>
              <p className="text-gray-300 text-sm md:text-lg">
                {featuredMovie.release_date ? new Date(featuredMovie.release_date).getFullYear() : 'N/A'} • 
                ⭐ {featuredMovie.vote_average.toFixed(1)} • 
                {featuredMovie.original_language.toUpperCase()}
              </p>
              <p className="text-gray-200 text-xs md:text-sm mt-2 line-clamp-2 md:line-clamp-3 hidden sm:block">
                {featuredMovie.overview}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Link href={`/movie/${featuredMovie.id}`}>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 text-white px-4 md:px-6 py-2 md:py-3 btn-rounded font-semibold hover:bg-red-700 transition-colors text-sm md:text-base">
                  <Play size={16} className="md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Watch Trailer</span>
                  <span className="sm:hidden">Watch</span>
                </button>
              </Link>
              <button 
                onClick={handleWatchlistToggle}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 btn-rounded font-semibold transition-colors text-sm md:text-base ${
                  isInWatchlist(featuredMovie.id)
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                <Bookmark size={16} className="md:w-5 md:h-5" />
                <span className="hidden sm:inline">
                  {isInWatchlist(featuredMovie.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </span>
                <span className="sm:hidden">
                  {isInWatchlist(featuredMovie.id) ? 'Remove' : 'Add'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
