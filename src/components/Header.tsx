'use client';

import { Search, Bell, User, LogOut, X, Menu, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { useGenres } from '@/hooks/useGenres';
import { getPosterUrl } from '@/lib/tmdb';
import LoadingSpinner from './LoadingSpinner';

interface HeaderProps {
  onSearchToggle?: (isOpen: boolean) => void;
  onMenuToggle?: () => void;
}

export default function Header({ onSearchToggle, onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showGenresDropdown, setShowGenresDropdown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { movies, loading, error, search, clearSearch } = useSearch();
  const { genres } = useGenres();
  
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
      if (isSearchOpen && !(event.target as Element)?.closest?.('.search-container')) {
        toggleSearch();
      }
      if (showGenresDropdown && !(event.target as Element)?.closest?.('.genres-dropdown')) {
        setShowGenresDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen, showGenresDropdown]);

  return (
    <>
      <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-black fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuToggle}
          className="lg:hidden text-white hover:text-gray-300 transition-colors mr-4"
        >
          <Menu size={24} />
        </button>
        
        {/* Left - Brand */}
        <div className="text-xl md:text-2xl font-bold text-white">FILMAX</div>
        
        {/* Center - Navigation */}
        {!isSearchOpen && (
          <nav className="hidden lg:flex space-x-8">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/movies" className="text-white hover:text-gray-300 transition-colors">
              Movies
            </Link>
            <Link href="/tv" className="text-white hover:text-gray-300 transition-colors">
              TV
            </Link>
            <div className="relative genres-dropdown">
              <button 
                onClick={() => setShowGenresDropdown(!showGenresDropdown)}
                className="text-white hover:text-gray-300 transition-colors flex items-center gap-1"
              >
                Genres
                <ChevronDown size={16} className={`transition-transform ${showGenresDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Genres Dropdown */}
              {showGenresDropdown && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-gray-800 rounded-lg shadow-lg py-4 px-6 z-50">
                  <div className="grid grid-cols-2 gap-2">
                    {genres.map((genre) => (
                      <Link
                        key={genre.id}
                        href={`/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`}
                        className="text-white hover:text-red-400 transition-colors py-2 px-3 rounded hover:bg-gray-700 text-sm"
                        onClick={() => setShowGenresDropdown(false)}
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        )}
        
        {/* Expanded Search Bar */}
        {isSearchOpen && (
          <div className="flex-1 mx-4 md:mx-8 search-container">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-gray-800 text-white pl-8 md:pl-10 pr-8 md:pr-10 py-2 md:py-3 text-sm md:text-base rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
              />
              <button
                onClick={toggleSearch}
                className="absolute inset-y-0 right-0 pr-2 md:pr-3 flex items-center"
              >
                <X className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-white" />
              </button>
            </div>
          </div>
        )}
        
        {/* Right - Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
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
              <Link href="/subscription" className="hidden md:block">
                <button className="bg-red-600 text-white px-4 md:px-6 py-2 btn-rounded font-semibold hover:bg-red-700 transition-colors text-sm md:text-base">
                  Subscribe
                </button>
              </Link>
              <div className="relative hidden md:block">
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
              {user && !isSearchOpen && <span className="hidden md:inline text-sm">{user.fullName}</span>}
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                <Link href="/profile" onClick={() => setShowUserMenu(false)}>
                  <div className="px-4 py-2 text-white hover:bg-gray-700 transition-colors cursor-pointer">
                    Profile
                  </div>
                </Link>
                <div className="md:hidden">
                  <Link href="/subscription" onClick={() => setShowUserMenu(false)}>
                    <div className="px-4 py-2 text-white hover:bg-gray-700 transition-colors cursor-pointer">
                      Subscribe
                    </div>
                  </Link>
                  <Link href="/notifications" onClick={() => setShowUserMenu(false)}>
                    <div className="px-4 py-2 text-white hover:bg-gray-700 transition-colors cursor-pointer">
                      Notifications
                    </div>
                  </Link>
                </div>
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
        <div className="fixed top-16 md:top-20 left-0 right-0 bg-black bg-opacity-95 z-40 max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-5rem)] overflow-y-auto search-container backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
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
                <div className="mb-4 md:mb-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
                  <p className="text-gray-300 text-sm md:text-base">
                    Found {movies.length} result{movies.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
                
                {/* Movies Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6 mb-4 md:mb-6">
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
                      <div className="mt-2 md:mt-3">
                        <h3 className="text-white font-medium text-xs md:text-sm group-hover:text-red-400 transition-colors line-clamp-2">
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
                  <div className="flex justify-center items-center space-x-1 md:space-x-2 py-4">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-2 md:px-4 py-2 text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all duration-200 hover:scale-105 text-xs md:text-sm"
                    >
                      Prev
                    </button>
                    
                    {Array.from({ length: Math.min(window.innerWidth < 768 ? 3 : 5, totalPages) }, (_, i) => {
                      const maxVisible = window.innerWidth < 768 ? 3 : 5;
                      const pageNum = Math.max(1, Math.min(totalPages - maxVisible + 1, currentPage - Math.floor(maxVisible / 2))) + i;
                      return pageNum <= totalPages ? (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-2 md:px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-xs md:text-sm ${
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
                      className="px-2 md:px-4 py-2 text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all duration-200 hover:scale-105 text-xs md:text-sm"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 md:py-12">
                <p className="text-gray-400 text-base md:text-lg">No movies found for &quot;{searchQuery}&quot;</p>
                <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
