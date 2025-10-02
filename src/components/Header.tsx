'use client';

import { Search, Bell, User, LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { getPosterUrl } from '@/lib/tmdb';
import LoadingSpinner from './LoadingSpinner';

interface HeaderProps {
  onSearchToggle?: (isOpen: boolean) => void;
}

export default function Header({ onSearchToggle }: HeaderProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { movies, loading, error, search, clearSearch } = useSearch();
  
  const ITEMS_PER_PAGE = 20;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const toggleSearch = () => {
    const newState = !isSearchOpen;
    setIsSearchOpen(newState);
    onSearchToggle?.(newState);
    if (newState) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      clearSearch();
      setCurrentPage(1);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    if (query.trim()) {
      search(query);
    } else {
      clearSearch();
    }
  };

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMovies = movies.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSearchOpen && !event.target?.closest?.('.search-container')) {
        toggleSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 bg-black fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Left - Brand */}
        <div className="text-2xl font-bold text-white">FILMAX</div>
        
        {/* Center - Navigation */}
        {!isSearchOpen && (
          <nav className="flex space-x-8">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Movies</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Series</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Animation</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Genres</a>
          </nav>
        )}
        
        {/* Expanded Search Bar */}
        {isSearchOpen && (
          <div className="flex-1 mx-8 search-container">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-gray-800 text-white pl-10 pr-10 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
              />
              <button
                onClick={toggleSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-white" />
              </button>
            </div>
          </div>
        )}
        
        {/* Right - Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Toggle */}
          {!isSearchOpen && (
            <button 
              onClick={toggleSearch}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Search size={20} />
            </button>
          )}
          
          {!isSearchOpen && (
            <>
              <Link href="/subscription">
                <button className="bg-red-600 text-white px-6 py-2 btn-rounded font-semibold hover:bg-red-700 transition-colors">
                  Subscribe
                </button>
              </Link>
              <div className="relative">
                <Link href="/notifications">
                  <button className="text-white hover:text-gray-300 transition-colors">
                    <Bell size={20} />
                  </button>
                </Link>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
              </div>
            </>
          )}
          
          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="text-white hover:text-gray-300 transition-colors flex items-center space-x-2"
            >
              <User size={20} />
              {user && !isSearchOpen && <span className="text-sm">{user.fullName}</span>}
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                <Link href="/profile" onClick={() => setShowUserMenu(false)}>
                  <div className="px-4 py-2 text-white hover:bg-gray-700 transition-colors cursor-pointer">
                    Profile
                  </div>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Search Results Overlay */}
      {isSearchOpen && searchQuery && (
        <div className="fixed top-20 left-0 right-0 bg-black bg-opacity-95 z-40 max-h-[calc(100vh-5rem)] overflow-y-auto search-container backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-8 py-6">
            {loading ? (
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
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-300">
                    Found {movies.length} result{movies.length !== 1 ? 's' : ''} for "{searchQuery}"
                  </p>
                  <p className="text-gray-400 text-sm">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
                
                {/* Movies Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
                  {currentMovies.map((movie) => (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      className="group cursor-pointer"
                      onClick={toggleSearch}
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={getPosterUrl(movie.poster_path, 'w500')}
                          alt={movie.title}
                          className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      </div>
                      <div className="mt-3">
                        <h3 className="text-white font-medium text-sm group-hover:text-red-400 transition-colors line-clamp-2">
                          {movie.title}
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">
                          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'} • 
                          ⭐ {movie.vote_average.toFixed(1)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 py-4">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all duration-200 hover:scale-105"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      return pageNum <= totalPages ? (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
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
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all duration-200 hover:scale-105"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No movies found for "{searchQuery}"</p>
                <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
