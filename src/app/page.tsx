'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/HeroSection';
import RightSidebar from '@/components/RightSidebar';
import ContinueWatching from '@/components/ContinueWatching';
import StudioLogos from '@/components/StudioLogos';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  LazyWrapper, 
  LazyComingSoon, 
  LazyTopRatedMovies,
  LazyWatchlist,
  LazyFavorites,
  LazyTrendingMovies,
  LazyLatestMovies,
  LazyComingSoonPreview,
  LazyRightSidebar
} from '@/components/LazyComponents';

export default function Home() {
  const [activeSection, setActiveSection] = useState('discovery');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// TEST CI/CD 
  const renderMainContent = () => {
    switch (activeSection) {
      case 'discovery':
        return (
          <>
            <HeroSection />
            <ContinueWatching />
            <LazyWrapper fallback={<div className="py-4 text-center text-gray-400">Loading latest movies...</div>}>
              <LazyLatestMovies />
            </LazyWrapper>
            <LazyWrapper fallback={<div className="py-4 text-center text-gray-400">Loading trending movies...</div>}>
              <LazyTrendingMovies />
            </LazyWrapper>
            <LazyWrapper fallback={<div className="py-4 text-center text-gray-400">Loading coming soon...</div>}>
              <LazyComingSoonPreview />
            </LazyWrapper>
          </>
        );
      case 'coming-soon':
        return (
          <LazyWrapper fallback={<div className="py-8 text-center text-gray-400">Loading movies...</div>}>
            <LazyComingSoon />
          </LazyWrapper>
        );
      case 'top-rated':
        return (
          <LazyWrapper fallback={<div className="py-8 text-center text-gray-400">Loading top rated movies...</div>}>
            <LazyTopRatedMovies />
          </LazyWrapper>
        );
      case 'watchlist':
        return (
          <LazyWrapper fallback={<div className="py-8 text-center text-gray-400">Loading watchlist...</div>}>
            <LazyWatchlist />
          </LazyWrapper>
        );
      case 'favorites':
        return (
          <LazyWrapper fallback={<div className="py-8 text-center text-gray-400">Loading favorites...</div>}>
            <LazyFavorites />
          </LazyWrapper>
        );
      default:
        return (
          <>
            <HeroSection />
            <ContinueWatching />
            <StudioLogos />
          </>
        );
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        <Header 
          onSearchToggle={setIsSearchOpen} 
          onMenuToggle={() => setIsSidebarOpen(true)}
        />
      
      <div className="flex h-screen pt-16">
        <Sidebar 
          onSectionChange={setActiveSection}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeSection={activeSection}
        />
        
        <div className={`flex-1 overflow-y-auto px-4 md:px-8 transition-all duration-300 ${
          activeSection === 'coming-soon' || activeSection === 'watchlist' || activeSection === 'favorites' 
            ? 'max-w-none' 
            : ''
        } ${isSearchOpen || isSidebarOpen ? 'blur-sm pointer-events-none' : ''}`}>
          {renderMainContent()}
        </div>
        
        {/* Only show right sidebar for discovery section on desktop */}
        {activeSection === 'discovery' && (
          <div className={`hidden xl:block overflow-y-auto transition-all duration-300 ${isSearchOpen || isSidebarOpen ? 'blur-sm pointer-events-none' : ''}`}>
            <LazyWrapper fallback={<div className="py-4 text-center text-gray-400">Loading sidebar...</div>}>
              <LazyRightSidebar onSectionChange={setActiveSection} />
            </LazyWrapper>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
