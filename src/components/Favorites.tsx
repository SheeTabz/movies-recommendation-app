'use client';

import { useWatchlist } from '@/hooks/useWatchlist';
import MovieCard from './MovieCard';

export default function Favorites() {
  const { favorites } = useWatchlist();

  if (favorites.length === 0) {
    return (
      <section className="py-8">
        <div className="text-center py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Your Favorites</h2>
          <p className="text-gray-400 text-lg mb-4">No favorite movies yet</p>
          <p className="text-gray-500">Mark movies as favorites to find them easily</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Favorites</h2>
        <p className="text-gray-400">{favorites.length} favorite movie{favorites.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            badge={{
              text: '❤️',
              color: 'bg-red-600'
            }}
          />
        ))}
      </div>
    </section>
  );
}