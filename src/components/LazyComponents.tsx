import { lazy, Suspense } from 'react'
import LoadingSpinner from './LoadingSpinner'

// Lazy load heavy components
export const LazyMovieDetails = lazy(() => import('@/app/movie/[id]/page'))
export const LazyComingSoon = lazy(() => import('./ComingSoon'))
export const LazyHistoryPlayed = lazy(() => import('./HistoryPlayed'))

// Wrapper component for lazy loading with fallback
export function LazyWrapper({ 
  children, 
  fallback = <LoadingSpinner /> 
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