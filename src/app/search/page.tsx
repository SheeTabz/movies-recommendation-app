'use client';

import { useState, useEffect } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { getPosterUrl } from '@/lib/tmdb';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { movies, loading, error, hasMore, search, loadMore, clearSearch } = useSearch();

  useEffect(() => {
    // Get search query from URL params if available
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      setSearchQuery(query);
      search(query);
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      search(query);
      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.set('q', query);
      window.history.pushState({}, '', url.toString());
    } else {
      clearSearch();
      // Clear URL
      const url = new URL(window.location.href);
      url.searchParams.delete('q');
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    clearSearch();
    const url = new URL(window.location.href);
    url.searchParams.delete('q');
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Search Movies</h1>
          
          {/* Search Input */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-gray-800 text-white pl-10 pr-10 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div>
            {loading && !movies.length ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Error loading search results</p>
                <p className="text-gray-500 text-sm mt-2">{error}</p>
              </div>
            ) : movies.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-300">
                    Found {movies.length} result{movies.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
                  </p>
                </div>
                
                {/* Movies Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {movies.map((movie) => (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      className="group cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={getPosterUrl(movie.poster_path, 'w500')}
                          alt={movie.title}
                          className="w-full aspect-[2/3] object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg"></div>
                      </div>
                      <div className="mt-3">
                        <h3 className="text-white font-medium text-sm group-hover:text-gray-300 transition-colors line-clamp-2">
                          {movie.title}
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">
                          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'} • 
                          Rating: {movie.vote_average.toFixed(1)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-8">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="bg-red-600 text-white px-8 py-3 btn-rounded font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No movies found for &quot;{searchQuery}&quot;</p>
                <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
              </div>
            )}
          </div>
        )}

        {/* No Search Query */}
        {!searchQuery && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-300 mb-2">Search for Movies</h2>
            <p className="text-gray-500">Enter a movie title to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
