'use client';

import { useWatchlist } from '@/hooks/useWatchlist';
import MovieCard from './MovieCard';

export default function Watchlist() {
  const { watchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <section className="py-8">
        <div className="text-center py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Your Watchlist</h2>
          <p className="text-gray-400 text-lg mb-4">No movies in your watchlist yet</p>
          <p className="text-gray-500">Add movies to your watchlist to watch them later</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Watchlist</h2>
        <p className="text-gray-400">{watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} in your watchlist</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {watchlist.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
}