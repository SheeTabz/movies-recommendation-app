'use client';

import { useState } from 'react';
import { Star, Clock, Download, Moon, Settings, Home, Calendar } from 'lucide-react';

interface SidebarProps {
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ onSectionChange }: SidebarProps) {
  const [activeSection, setActiveSection] = useState('discovery');

  const menuItems = [
    { id: 'discovery', label: 'Discovery', icon: Home },
    { id: 'top-rated', label: 'Top Rated', icon: Star },
    { id: 'coming-soon', label: 'Coming Soon', icon: Calendar },
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    onSectionChange(sectionId);
  };

  return (
    <aside className="w-80 bg-gray-900 min-h-screen pt-8 px-6">
      {/* MENU Section */}
      <div className="mb-8">
        <h3 className="text-gray-400 text-sm font-semibold mb-4">MENU</h3>
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`w-full flex items-center space-x-3 py-3 px-3 btn-rounded transition-colors relative ${
                  isActive 
                    ? 'bg-white text-gray-800' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-r"></div>
                )}
                <Icon size={20} className={isActive ? 'text-gray-800' : ''} />
                <span className={isActive ? 'text-gray-800 font-medium' : ''}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* LIBRARY Section */}
      <div className="mb-8">
        <h3 className="text-gray-400 text-sm font-semibold mb-4">LIBRARY</h3>
        <div className="space-y-2">
          {/* Recent Played */}
          <button
            onClick={() => handleSectionClick('recent-played')}
            className={`w-full flex items-center space-x-3 py-3 px-3 btn-rounded transition-colors relative ${
              activeSection === 'recent-played'
                ? 'bg-white text-gray-800'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {activeSection === 'recent-played' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-r"></div>
            )}
            <Clock size={20} className={activeSection === 'recent-played' ? 'text-gray-800' : ''} />
            <span className={activeSection === 'recent-played' ? 'text-gray-800 font-medium' : ''}>Recent Played</span>
          </button>
          
          {/* Download */}
          <button
            onClick={() => handleSectionClick('download')}
            className={`w-full flex items-center space-x-3 py-3 px-3 btn-rounded transition-colors relative ${
              activeSection === 'download'
                ? 'bg-white text-gray-800'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {activeSection === 'download' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-r"></div>
            )}
            <Download size={20} className={activeSection === 'download' ? 'text-gray-800' : ''} />
            <span className={activeSection === 'download' ? 'text-gray-800 font-medium' : ''}>Download</span>
          </button>
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
            <span>Setting</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
