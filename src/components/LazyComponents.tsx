import { lazy, Suspense } from 'react'
import LoadingSpinner from './LoadingSpinner'

// Lazy load heavy components that are not immediately visible
export const LazyComingSoon = lazy(() => import('./ComingSoon'))
export const LazyTopRatedMovies = lazy(() => import('./TopRatedMovies'))
export const LazyWatchlist = lazy(() => import('./Watchlist'))
export const LazyFavorites = lazy(() => import('./Favorites'))
export const LazyTrendingMovies = lazy(() => import('./TrendingMovies'))
export const LazyLatestMovies = lazy(() => import('./LatestMovies'))
export const LazyComingSoonPreview = lazy(() => import('./ComingSoonPreview'))
export const LazyRightSidebar = lazy(() => import('./RightSidebar'))

// Wrapper component for lazy loading with fallback
export function LazyWrapper({ 
  children, 
  fallback = <div className="flex items-center justify-center py-8"><LoadingSpinner /></div>
}: { 
  children: React.ReactNode
  fallback?: React.ReactNode 
}) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}