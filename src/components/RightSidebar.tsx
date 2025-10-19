'use client';

import { Star } from 'lucide-react';
import { useTopRatedMovies } from '@/hooks/useMovies';
import { useGenres } from '@/hooks/useGenres';
import { getPosterUrl } from '@/lib/tmdb';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';

interface RightSidebarProps {
  onSectionChange?: (section: string) => void;
}

export default function RightSidebar({ onSectionChange }: RightSidebarProps) {
  const { movies, loading, error } = useTopRatedMovies();
  const { genres, loading: genresLoading, error: genresError } = useGenres();
  return (
    <aside className="w-72 xl:w-80 bg-black min-h-screen pt-4 md:pt-8 px-4 md:px-6">
            {/* Top Movies Section */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-white text-base md:text-lg font-bold mb-3 md:mb-4">Top Movies</h3>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-gray-400 text-sm text-center py-4">
            Unable to load top movies
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {movies.slice(0, 3).map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`} className="flex items-center space-x-2 md:space-x-3 hover:bg-gray-800 p-2 rounded-lg transition-colors">
                <div className="w-20 h-28 md:w-28 md:h-36 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={getPosterUrl(movie.poster_path, 'w185')}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1 md:space-x-2 mb-1">
                    <span className="text-xs bg-gray-600 text-white px-1 btn-rounded">
                      {movie.adult ? 'R' : 'PG-13'}
                    </span>
                  </div>
                  <h4 className="text-white text-xs md:text-sm font-medium mb-1 line-clamp-2">
                    {movie.title}
                  </h4>
                  <p className="text-gray-400 text-xs mb-1">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Star size={10} className="md:w-3 md:h-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs md:text-sm">{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

                        <button 
                          onClick={() => onSectionChange?.('top-rated')}
                          className="w-full mt-3 md:mt-4 border border-red-600 text-red-600 py-2 btn-rounded font-semibold hover:bg-red-600 hover:text-white transition-colors text-sm"
                        >
                          See All
                        </button>
      </div>
      
      {/* Favorites Genres Section */}
      {/* <div>
        <h3 className="text-white text-base md:text-lg font-bold mb-3 md:mb-4">Movie Genres</h3>
        
        {genresLoading ? (
          <div className="flex items-center justify-center py-4">
            <LoadingSpinner />
          </div>
        ) : genresError ? (
          <div className="text-gray-400 text-xs text-center py-4">
            Unable to load genres
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2">
            {genres.slice(0, 8).map((genre) => (
              <button 
                key={genre.id}
                className="bg-gray-700 text-white py-1 px-2 btn-rounded text-xs hover:bg-gray-600 transition-colors"
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}
      </div> */}
    </aside>
  );
}
