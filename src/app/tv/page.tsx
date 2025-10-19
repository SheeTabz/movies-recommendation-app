'use client';

import { useState, useCallback, useMemo } from 'react';
import { useDiscoverTVShows } from '@/hooks/useMovies';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';
import { getPosterUrl } from '@/lib/tmdb';

const ITEMS_PER_PAGE = 18;

export default function TVPage() {
  const { shows, loading, error } = useDiscoverTVShows();
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentShows = shows.slice(startIndex, endIndex);
    const totalPages = Math.ceil(shows.length / ITEMS_PER_PAGE);
    
    return { currentShows, totalPages };
  }, [shows, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-20 flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !shows.length) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-20 text-center py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">TV Shows</h2>
          <p className="text-gray-400">Unable to load TV shows</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-20 px-4 md:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">TV Shows</h2>
          <p className="text-gray-400">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, shows.length)} of {shows.length} shows
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-8">
          {paginatedData.currentShows.map((show) => (
            <Link
              key={show.id}
              href={`/tv/${show.id}`}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-800">
                <img
                  src={getPosterUrl(show.poster_path, 'w500')}
                  alt={show.name}
                  className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
              
              <div className="mt-2 md:mt-3">
                <h3 className="text-white font-medium text-xs md:text-sm group-hover:text-red-400 transition-colors line-clamp-2">
                  {show.name}
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'}
                </p>
              </div>
            </Link>
          ))}
        </div>

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
      </div>
    </div>
  );
}