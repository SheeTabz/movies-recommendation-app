'use client';

import { Star } from 'lucide-react';
import { useTopRatedMovies } from '@/hooks/useMovies';
import { getPosterUrl } from '@/lib/tmdb';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';

export default function RightSidebar() {
  const { movies, loading, error } = useTopRatedMovies();
  return (
    <aside className="w-80 bg-black min-h-screen pt-8 px-6">
            {/* Top Movies Section */}
      <div className="mb-8">
        <h3 className="text-white text-lg font-bold mb-4">Top Movies</h3>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-gray-400 text-sm text-center py-4">
            Unable to load top movies
          </div>
        ) : (
          <div className="space-y-4">
            {movies.slice(0, 3).map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`} className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg transition-colors">
                <div className="w-28 h-36 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={getPosterUrl(movie.poster_path, 'w185')}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs bg-gray-600 text-white px-1 btn-rounded">
                      {movie.adult ? 'R' : 'PG-13'}
                    </span>
                    <span className="text-white text-sm font-medium">
                      {movie.title.length > 15 ? `${movie.title.substring(0, 15)}...` : movie.title}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mb-1">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    <span className="text-white text-sm">{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
                        <button className="w-full mt-4 border border-red-600 text-red-600 py-2 btn-rounded font-semibold hover:bg-red-600 hover:text-white transition-colors">
                  See All
                </button>
      </div>
      
      {/* Favorites Genres Section */}
      <div>
        <h3 className="text-white text-lg font-bold mb-4">Favorites Genres</h3>
        
                        <div className="grid grid-cols-3 gap-1">
                            <button className="bg-gray-700 text-white py-1 px-2 btn-rounded text-xs hover:bg-gray-600 transition-colors">
            Action
          </button>
                            <button className="bg-gray-700 text-white py-1 px-2 btn-rounded text-xs hover:bg-gray-600 transition-colors">
            Fantasy
          </button>
                            <button className="bg-gray-700 text-white py-1 px-2 btn-rounded text-xs hover:bg-gray-600 transition-colors">
            Comedy
          </button>
                            <button className="bg-gray-700 text-white py-1 px-2 btn-rounded text-xs hover:bg-gray-600 transition-colors">
            Sci-Fi
          </button>
                            <button className="bg-gray-700 text-white py-1 px-2 btn-rounded text-xs hover:bg-gray-600 transition-colors">
            Drama
          </button>
                            <button className="bg-gray-700 text-white py-1 px-2 btn-rounded text-xs hover:bg-gray-600 transition-colors">
            Romance
          </button>
                            <button className="bg-gray-700 text-white py-1 px-2 btn-rounded text-xs hover:bg-gray-600 transition-colors">
            Mystery
          </button>
                            <button className="bg-gray-700 text-white py-1 px-2 btn-rounded text-xs hover:bg-gray-600 transition-colors">
            Horror
          </button>
        </div>
      </div>
    </aside>
  );
}
