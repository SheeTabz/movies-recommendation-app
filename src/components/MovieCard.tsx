'use client';

import { ChevronRight } from 'lucide-react';

interface MovieCardProps {
  category: string;
  categoryColor?: string;
  imageUrl?: string;
  title?: string;
}

export default function MovieCard({ 
  category, 
  categoryColor = "bg-gray-600",
  imageUrl,
  title 
}: MovieCardProps) {
  return (
    <div className="flex-shrink-0 w-64 group cursor-pointer movie-card-hover">
      <div className="relative">
        {/* Movie Image */}
        <div className="w-full h-40 rounded-lg mb-3 group-hover:scale-105 transition-transform duration-200 overflow-hidden">
          <img 
            src="https://i.ytimg.com/vi/1AAI0OdvpEg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB6kkQVcHAe7sQBMQoCu86BYlaolQ"
            alt={title || category} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Category Tag with proper colors and enhanced styling */}
        <div className={`absolute top-2 left-2 ${categoryColor} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg category-banner`}>
          {category}
        </div>
        
        {/* Movie Title and Navigation */}
        {title && (
          <div className="flex items-center justify-between">
            <h3 className="text-white font-medium text-sm group-hover:text-gray-300 transition-colors">
              {title}
            </h3>
            <ChevronRight size={16} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
        )}
      </div>
    </div>
  );
}
