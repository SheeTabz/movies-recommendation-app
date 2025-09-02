'use client';

import { Play, Bookmark } from 'lucide-react';
import { usePopularMovies } from '@/hooks/useMovies';
import { getBackdropUrl, getPosterUrl } from '@/lib/tmdb';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';

export default function HeroSection() {
  const { movies, loading, error } = usePopularMovies();
  
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

  return (
    <section className="py-8">
      <div className="relative w-full h-[28rem] rounded-lg overflow-hidden">
        {/* Background Image */}
        <img 
          src={backdropUrl}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        
        {/* Movie Tag */}
        <div className="absolute top-4 left-4 bg-gray-600 text-white px-3 py-1 btn-rounded text-sm">
          Movie
        </div>
        
        {/* Content Overlay on Left */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-1/2 px-8">
            {/* Movie Info */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-white mb-3">{featuredMovie.title}</h1>
              <p className="text-gray-300 text-lg">
                {featuredMovie.release_date ? new Date(featuredMovie.release_date).getFullYear() : 'N/A'} • 
                Rating: {featuredMovie.vote_average.toFixed(1)}/10 • 
                {featuredMovie.original_language.toUpperCase()}
              </p>
              <p className="text-gray-200 text-sm mt-2 line-clamp-3">
                {featuredMovie.overview}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Link href={`/movie/${featuredMovie.id}`}>
                <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 btn-rounded font-semibold hover:bg-red-700 transition-colors">
                  <Play size={20} />
                  Watch Trailer
                </button>
              </Link>
              <button className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 btn-rounded font-semibold hover:bg-gray-700 transition-colors">
                <Bookmark size={20} />
                Add Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
