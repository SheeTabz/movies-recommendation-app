'use client';

import { useState } from 'react';
import { Star, Clock, Bookmark, Heart, Moon, Settings, Home, Calendar, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import SidebarMenuItem from './SidebarMenuItem';
import Link from 'next/link';

interface SidebarProps {
  onSectionChange: (section: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  activeSection?: string;
}

export default function Sidebar({ onSectionChange, isOpen = false, onClose, activeSection = 'discovery' }: SidebarProps) {
  const { user } = useAuth();

  const menuItems = [
    { id: 'discovery', label: 'Discovery', icon: Home },
    { id: 'top-rated', label: 'Top Rated', icon: Star },
    { id: 'coming-soon', label: 'Coming Soon', icon: Calendar },
  ];

  const libraryItems = [
    { id: 'watchlist', label: 'Watchlist', icon: Bookmark },
    { id: 'favorites', label: 'Favorites', icon: Heart },
  ];

  const handleSectionClick = (sectionId: string) => {
    // Check if user needs to be logged in for this section
    if ((sectionId === 'watchlist' || sectionId === 'favorites') && !user) {
      window.location.href = '/login';
      return;
    }
    
    onSectionChange(sectionId);
    onClose?.(); // Close mobile sidebar after selection
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 backdrop-blur-md z-50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        w-80 bg-gray-900 h-full pt-8 px-6 transition-transform duration-300 ease-in-out overflow-y-auto
        lg:translate-x-0 lg:static lg:z-auto lg:block
        fixed top-0 left-0 z-60 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <X size={24} />
        </button>
        
        {/* MENU Section */}
        <div className="mb-8 mt-8 lg:mt-0">
          <h3 className="text-gray-400 text-sm font-semibold mb-4">MENU</h3>
        <div className="space-y-2">
          {menuItems.map((item) => (
            <SidebarMenuItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              isActive={activeSection === item.id}
              onClick={handleSectionClick}
            />
          ))}
        </div>
      </div>
      
      {/* LIBRARY Section */}
      <div className="mb-8">
        <h3 className="text-gray-400 text-sm font-semibold mb-4">LIBRARY</h3>
        <div className="space-y-2">
          {libraryItems.map((item) => (
            <SidebarMenuItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              isActive={activeSection === item.id}
              onClick={handleSectionClick}
            />
          ))}
        </div>
      </div>
      
      {/* SETTINGS Section */}
      <div>
        <h3 className="text-gray-400 text-sm font-semibold mb-4">SETTINGS</h3>
        <div className="space-y-2">
          {/* Dark Mode */}
          <div className="flex items-center space-x-3 py-3 px-3 text-gray-300 hover:text-white hover:bg-gray-800 btn-rounded transition-colors cursor-pointer">
            <Moon size={20} />
            <span>Dark Mode</span>
          </div>
          
          {/* Setting */}
          <div className="flex items-center space-x-3 py-3 px-3 text-gray-300 hover:text-white hover:bg-gray-800 btn-rounded transition-colors cursor-pointer">
            <Settings size={20} />
           <Link href="/profile"><span>Setting</span></Link>
          </div>
        </div>
      </div>
      </aside>
    </>
  );
}
