'use client';

import { useState, useCallback, useMemo } from 'react';
import { useUpcomingMovies } from '@/hooks/useMovies';
import LoadingSpinner from './LoadingSpinner';
import MovieCard from './MovieCard';

const ITEMS_PER_PAGE = 18;

export default function ComingSoon() {
  const { movies, loading, error } = useUpcomingMovies();
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const futureMovies = movies.filter(movie => {
      if (!movie.release_date) return false;
      const releaseDate = new Date(movie.release_date);
      return releaseDate >= today;
    });
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentMovies = futureMovies.slice(startIndex, endIndex);
    const totalPages = Math.ceil(futureMovies.length / ITEMS_PER_PAGE);
    
    return { currentMovies, totalPages, totalMovies: futureMovies.length };
  }, [movies, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Coming Soon</h2>
          <p className="text-gray-400">Unable to load upcoming movies</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Coming Soon</h2>
        <p className="text-gray-400">
          Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, paginatedData.totalMovies)} of {paginatedData.totalMovies} upcoming movies
        </p>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-8">
        {paginatedData.currentMovies.map((movie) => {
          const releaseDate = movie.release_date ? new Date(movie.release_date) : null;
          const releaseDateText = releaseDate ? releaseDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          }) : 'TBA';
          
          return (
            <div key={movie.id} className="relative">
              <MovieCard
                movie={movie}
                secondaryBadge={{
                  text: releaseDateText,
                  color: 'bg-blue-600'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {paginatedData.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all duration-200 text-sm"
          >
            Previous
          </button>
          
          {Array.from({ length: Math.min(5, paginatedData.totalPages) }, (_, i) => {
            const maxVisible = 5;
            const pageNum = Math.max(1, Math.min(paginatedData.totalPages - maxVisible + 1, currentPage - Math.floor(maxVisible / 2))) + i;
            return pageNum <= paginatedData.totalPages ? (
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
            ) : null;
          })}
          
          <button
            onClick={() => handlePageChange(Math.min(paginatedData.totalPages, currentPage + 1))}
            disabled={currentPage === paginatedData.totalPages}
            className="px-4 py-2 text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all duration-200 text-sm"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
