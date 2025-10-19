'use client';

import { useState, useCallback, useMemo } from 'react';
import { useTopRatedMovies } from '@/hooks/useMovies';
import { getPosterUrl } from '@/lib/tmdb';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';

const ITEMS_PER_PAGE = 18; // 6 cards per row × 3 rows

export default function TopRatedMovies() {
  const { movies, loading, error } = useTopRatedMovies();
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentMovies = movies.slice(startIndex, endIndex);
    const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
    
    return { currentMovies, totalPages };
  }, [movies, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderPagination = useCallback(() => {
    const { totalPages } = paginatedData;
    if (totalPages <= 1) return null;

    const maxVisible = 5;
    const startPage = Math.max(1, Math.min(totalPages - maxVisible + 1, currentPage - Math.floor(maxVisible / 2)));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all duration-200 text-sm"
        >
          Previous
        </button>
        
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageNum = startPage + i;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                currentPage === pageNum
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        
        <button
          onClick={() => handlePageChange(Math.min(paginatedData.totalPages, currentPage + 1))}
          disabled={currentPage === paginatedData.totalPages}
          className="px-4 py-2 text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all duration-200 text-sm"
        >
          Next
        </button>
      </div>
    );
  }, [currentPage, paginatedData.totalPages, handlePageChange]);

  if (loading) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error || !movies.length) {
    return (
      <section className="py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4">Top Rated Movies</h2>
          <p className="text-gray-400">Unable to load top rated movies</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Top Rated Movies</h2>
        <p className="text-gray-400">
          Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, movies.length)} of {movies.length} movies
        </p>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {paginatedData.currentMovies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg bg-gray-800">
              <img
                src={getPosterUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
              
              {/* Rating Badge */}
              <div className="absolute top-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                ⭐ {movie.vote_average.toFixed(1)}
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            
            <div className="mt-3">
              <h3 className="text-white font-medium text-sm group-hover:text-red-400 transition-colors line-clamp-2">
                {movie.title}
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {renderPagination()}
    </section>
  );
}