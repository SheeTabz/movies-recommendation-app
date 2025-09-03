'use client';

import { useMovieDetails } from '@/hooks/useMovieDetails';
import { getBackdropUrl, getPosterUrl } from '@/lib/tmdb';
import { Play, Bookmark, Star, Calendar, Clock, Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useParams } from 'next/navigation';

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = params?.id ? parseInt(params.id as string) : null;
  const { movie, similarMovies, recommendedMovies, loading, error } = useMovieDetails(movieId);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
            <p className="text-gray-400 mb-8">{error || 'The movie you are looking for does not exist.'}</p>
            <Link
              href="/"
              className="bg-red-600 text-white px-6 py-3 btn-rounded font-semibold hover:bg-red-700 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'w1280');
  const posterUrl = getPosterUrl(movie.poster_path, 'w500');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Backdrop */}
      <div className="relative h-96 lg:h-[500px]">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/" className="inline-flex items-center text-white hover:text-gray-300 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-64 h-96 lg:w-80 lg:h-[480px] object-cover rounded-lg shadow-2xl"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="text-xl text-gray-300 italic mb-6">&quot;{movie.tagline}&quot;</p>
            )}

            {/* Movie Details */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
              <div className="flex items-center">
                <Star className="text-yellow-400 mr-1" size={16} />
                <span>{movie.vote_average.toFixed(1)}/10</span>
              </div>
              {movie.release_date && (
                <div className="flex items-center">
                  <Calendar className="mr-1" size={16} />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
              )}
              {movie.runtime && (
                <div className="flex items-center">
                  <Clock className="mr-1" size={16} />
                  <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                </div>
              )}
              <div className="flex items-center">
                <Globe className="mr-1" size={16} />
                <span>{movie.original_language.toUpperCase()}</span>
              </div>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-700 text-white px-3 py-1 btn-rounded text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 btn-rounded font-semibold hover:bg-red-700 transition-colors">
                <Play size={20} />
                Watch Trailer
              </button>
              <button className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 btn-rounded font-semibold hover:bg-gray-700 transition-colors">
                <Bookmark size={20} />
                Add to Watchlist
              </button>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {movie.status && (
                <div>
                  <h3 className="font-semibold text-gray-300 mb-1">Status</h3>
                  <p className="text-white">{movie.status}</p>
                </div>
              )}
              {movie.budget > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-300 mb-1">Budget</h3>
                  <p className="text-white">${movie.budget.toLocaleString()}</p>
                </div>
              )}
              {movie.revenue > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-300 mb-1">Revenue</h3>
                  <p className="text-white">${movie.revenue.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {similarMovies.map((similarMovie) => (
                <Link
                  key={similarMovie.id}
                  href={`/movie/${similarMovie.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={getPosterUrl(similarMovie.poster_path, 'w500')}
                      alt={similarMovie.title}
                      className="w-full aspect-[2/3] object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-white font-medium text-sm group-hover:text-gray-300 transition-colors line-clamp-2">
                      {similarMovie.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">
                      {similarMovie.release_date ? new Date(similarMovie.release_date).getFullYear() : 'N/A'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Movies */}
        {recommendedMovies.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Recommended Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {recommendedMovies.map((recommendedMovie) => (
                <Link
                  key={recommendedMovie.id}
                  href={`/movie/${recommendedMovie.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={getPosterUrl(recommendedMovie.poster_path, 'w500')}
                      alt={recommendedMovie.title}
                      className="w-full aspect-[2/3] object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-white font-medium text-sm group-hover:text-gray-300 transition-colors line-clamp-2">
                      {recommendedMovie.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">
                      {recommendedMovie.release_date ? new Date(recommendedMovie.release_date).getFullYear() : 'N/A'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
