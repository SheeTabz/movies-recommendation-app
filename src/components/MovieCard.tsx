'use client';


import OptimizedImage from './OptimizedImage';
import Link from 'next/link';
import { TMDBMovie } from '@/lib/tmdb';

interface MovieCardProps {
  movie?: TMDBMovie;
  category?: string;
  categoryColor?: string;
  imageUrl?: string;
  title?: string;
  year?: string | number;

  badge?: {
    text: string;
    color: string;
    icon?: React.ReactNode;
  };
  secondaryBadge?: {
    text: string;
    color: string;
  };
  href?: string;
  className?: string;
}

export default function MovieCard({ 
  movie,
  category,
  categoryColor = "bg-gray-600",
  imageUrl,
  title,
  year,

  badge,
  secondaryBadge,
  href,
  className = ""
}: MovieCardProps) {
  const movieTitle = title || movie?.title || category || 'Unknown';
  const movieYear = year || (movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A');

  const movieImage = imageUrl || (movie ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null);
  const movieHref = href || (movie ? `/movie/${movie.id}` : '#');
  
  const CardContent = (
    <div className={`group cursor-pointer movie-card-hover ${className}`}>
      <div className="relative">
        {/* Movie Image */}
        <div className="w-full aspect-[2/3] rounded-lg mb-3 group-hover:scale-105 transition-transform duration-200 overflow-hidden bg-gray-800 relative">
          <OptimizedImage 
            src={movieImage || "https://i.ytimg.com/vi/1AAI0OdvpEg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB6kkQVcHAe7sQBMQoCu86BYlaolQ"}
            alt={movieTitle} 
            className="w-full h-full object-cover"
            width={500}
            height={750}
            priority={false}
          />
          
          {/* Primary Badge */}
          {(badge || category) && (
            <div className={`absolute top-2 left-2 ${badge?.color || categoryColor} text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg category-banner flex items-center gap-1`}>
              {badge?.icon}
              {badge?.text || category}
            </div>
          )}
          
          {/* Secondary Badge (e.g., rating) */}
          {secondaryBadge && (
            <div className={`absolute top-2 right-2 ${secondaryBadge.color} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
              {secondaryBadge.text}
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
      </div>
      
      {/* Movie Title and Info */}
      <div className="mt-2">
        <h3 className="text-white font-medium text-xs md:text-sm group-hover:text-red-400 transition-colors line-clamp-2">
          {movieTitle}
        </h3>
        <p className="text-gray-400 text-xs mt-1">
          {movieYear}
        </p>
      </div>
    </div>
  );
  
  return movieHref !== '#' ? (
    <Link href={movieHref}>
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
}
