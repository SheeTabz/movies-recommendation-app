'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/HeroSection';
import RightSidebar from '@/components/RightSidebar';
import ContinueWatching from '@/components/ContinueWatching';
import StudioLogos from '@/components/StudioLogos';
import ProtectedRoute from '@/components/ProtectedRoute';
import { LazyWrapper, LazyComingSoon, LazyHistoryPlayed } from '@/components/LazyComponents';

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
            <StudioLogos />
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
          <>
            <HeroSection />
            <ContinueWatching />
            <StudioLogos />
          </>
        );
      case 'recent-played':
        return (
          <LazyWrapper fallback={<div className="py-8 text-center text-gray-400">Loading history...</div>}>
            <LazyHistoryPlayed />
          </LazyWrapper>
        );
      case 'download':
        return (
          <div className="py-8">
            <h2 className="text-3xl font-bold text-white mb-8">Downloads</h2>
            <div className="text-center text-gray-400 py-20">
              <p className="text-xl mb-4">No downloads yet</p>
              <p>Download movies and shows to watch offline</p>
            </div>
          </div>
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
      
      <div className="flex pt-16">
        <Sidebar 
          onSectionChange={setActiveSection}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <div className={`flex-1 px-4 md:px-8 max-w-full overflow-hidden transition-all duration-300 ${
          activeSection === 'coming-soon' || activeSection === 'recent-played' || activeSection === 'download' 
            ? 'max-w-none' 
            : ''
        } ${isSearchOpen || isSidebarOpen ? 'blur-sm pointer-events-none' : ''}`}>
          {renderMainContent()}
        </div>
        
        {/* Only show right sidebar for discovery and top-rated sections on desktop */}
        {activeSection !== 'coming-soon' && activeSection !== 'recent-played' && activeSection !== 'download' && (
          <div className={`hidden xl:block transition-all duration-300 ${isSearchOpen || isSidebarOpen ? 'blur-sm pointer-events-none' : ''}`}>
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
