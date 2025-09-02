'use client';

import { Search, Bell, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-black fixed top-0 left-0 right-0 z-50">
      {/* Left - Brand */}
      <div className="text-2xl font-bold text-white">FILMAX</div>
      
      {/* Center - Navigation */}
      <nav className="flex space-x-8">
        <a href="#" className="text-white hover:text-gray-300 transition-colors">Movies</a>
        <a href="#" className="text-white hover:text-gray-300 transition-colors">Series</a>
        <a href="#" className="text-white hover:text-gray-300 transition-colors">Animation</a>
        <a href="#" className="text-white hover:text-gray-300 transition-colors">Genres</a>
      </nav>
      
      {/* Right - Actions */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Link href="/search">
            <button className="text-white hover:text-gray-300 transition-colors">
              <Search size={20} />
            </button>
          </Link>
        </div>
        
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
        {/* User Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="text-white hover:text-gray-300 transition-colors flex items-center space-x-2"
          >
            <User size={20} />
            {user && <span className="text-sm">{user.fullName}</span>}
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
  );
}
