'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/HeroSection';
import RightSidebar from '@/components/RightSidebar';


export default function Home() {
  const [activeSection, setActiveSection] = useState('discovery');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'discovery':
        return (
          <>
            <HeroSection />

          </>
        );
 
  
        return (
          <>
            <HeroSection />

          </>
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

          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="flex pt-16">
        <Sidebar onSectionChange={setActiveSection} />
        
        <div className={`flex-1 px-8 max-w-full overflow-hidden ${
          activeSection === 'coming-soon' || activeSection === 'recent-played' || activeSection === 'download' 
            ? 'max-w-none' 
            : ''
        }`}>
          {renderMainContent()}
        </div>
        
        {/* Only show right sidebar for discovery and top-rated sections */}
        {activeSection !== 'coming-soon' && activeSection !== 'recent-played' && activeSection !== 'download' && <RightSidebar />}
      </div>
    </div>
  );
}
