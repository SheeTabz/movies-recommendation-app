'use client';

import { ArrowRight } from 'lucide-react';
import MovieCard from './MovieCard';

interface TrendingMovie {
  id: string;
  category: string;
  categoryColor: string;
  imageUrl?: string;
  title?: string;
}

interface TrendingSectionProps {
  movies: TrendingMovie[];
}

export default function TrendingSection({ movies }: TrendingSectionProps) {
  return (
    <section className="px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-bold">Trending Now</h2>
        <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors font-medium">
          See more
          <ArrowRight size={18} />
        </button>
      </div>
      <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            category={movie.category}
            categoryColor={movie.categoryColor}
            imageUrl={movie.imageUrl}
            title={movie.title}
          />
        ))}
      </div>
    </section>
  );
}
