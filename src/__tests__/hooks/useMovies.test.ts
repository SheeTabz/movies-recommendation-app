import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { usePopularMovies, useTopRatedMovies } from '@/hooks/useMovies'
import type { TMDBMovie, TMDBResponse } from '@/lib/tmdb'

//  Mock the TMDB service

vi.mock('@/lib/tmdb', () => ({
  tmdbService: {
    getPopularMovies: vi.fn(),
    getTopRatedMovies: vi.fn(),
  }
}))

// Import the mocked service
import { tmdbService } from '@/lib/tmdb'
const mockedTmdbService = vi.mocked(tmdbService)

// Mock Data representation of what TMDB API would return
const mockMovie1: TMDBMovie = {
  id: 1,
  title: 'Test Movie 1',
  overview: 'First test movie',
  poster_path: '/poster1.jpg',
  backdrop_path: '/backdrop1.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  genre_ids: [28, 12],
  adult: false,
  original_language: 'en',
  original_title: 'Test Movie 1',
  popularity: 100.5,
  video: false
}

const mockMovie2: TMDBMovie = {
  id: 2,
  title: 'Test Movie 2',
  overview: 'Second test movie',
  poster_path: '/poster2.jpg',
  backdrop_path: '/backdrop2.jpg',
  release_date: '2024-01-02',
  vote_average: 7.8,
  vote_count: 800,
  genre_ids: [35, 18],
  adult: false,
  original_language: 'en',
  original_title: 'Test Movie 2',
  popularity: 90.2,
  video: false
}

const mockPage1Response: TMDBResponse<TMDBMovie> = {
  page: 1,
  results: [mockMovie1],
  total_pages: 3,
  total_results: 60
}

const mockPage2Response: TMDBResponse<TMDBMovie> = {
  page: 2,
  results: [mockMovie2],
  total_pages: 3,
  total_results: 60
}

describe('useMovies Hooks', () => {
  
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  // usePopularMovies Hook
  describe('usePopularMovies', () => {
    
    // Initial state
    it('should have correct initial state', () => {
      // ARRANGE: Mock successful API response
      mockedTmdbService.getPopularMovies.mockResolvedValue(mockPage1Response)

      // ACT: Render the hook
      const { result } = renderHook(() => usePopularMovies())

      // ASSERT: Check initial state
      expect(result.current.movies).toEqual([])
      expect(result.current.loading).toBe(true)
      expect(result.current.error).toBe(null)
      expect(result.current.hasMore).toBe(true)
      expect(typeof result.current.loadMore).toBe('function')
      expect(typeof result.current.refresh).toBe('function')
    })

    // Successful data fetching
    it('should fetch movies successfully on mount', async () => {
      // ARRANGE: Mock successful API response
      mockedTmdbService.getPopularMovies.mockResolvedValue(mockPage1Response)

      // ACT: Render the hook
      const { result } = renderHook(() => usePopularMovies())

      // ASSERT: Wait for the API call to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Check final state
      expect(result.current.movies).toEqual([mockMovie1])
      expect(result.current.error).toBe(null)
      expect(result.current.hasMore).toBe(true) // page 1 < total_pages 3
      expect(mockedTmdbService.getPopularMovies).toHaveBeenCalledWith(1)
    })

    // Error handling
    it('should handle API errors', async () => {
      // ARRANGE: Mock API error
      const errorMessage = 'API Error: Failed to fetch movies'
      mockedTmdbService.getPopularMovies.mockRejectedValue(new Error(errorMessage))

      // ACT: Render the hook
      const { result } = renderHook(() => usePopularMovies())

      // ASSERT: Wait for error to be set
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.movies).toEqual([])
      expect(result.current.error).toBe(errorMessage)
      expect(result.current.hasMore).toBe(true) // Should remain true on error
    })

    // Load more functionality
    it('should load more movies when loadMore is called', async () => {
      // ARRANGE: Mock responses for page 1 and page 2
      mockedTmdbService.getPopularMovies
        .mockResolvedValueOnce(mockPage1Response) // First call (useEffect)
        .mockResolvedValueOnce(mockPage2Response) // Second call (loadMore)

      // ACT: Render the hook
      const { result } = renderHook(() => usePopularMovies())

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Verify initial state
      expect(result.current.movies).toEqual([mockMovie1])

      // ACT: Call loadMore
      await act(async () => {
        result.current.loadMore()
      })

      // Wait for loadMore to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // ASSERT: Should have both movies
      expect(result.current.movies).toEqual([mockMovie1, mockMovie2])
      expect(result.current.hasMore).toBe(true) // page 2 < total_pages 3
      expect(mockedTmdbService.getPopularMovies).toHaveBeenCalledTimes(2)
      expect(mockedTmdbService.getPopularMovies).toHaveBeenNthCalledWith(2, 2)
    })

    // Load more when no more pages
    it('should set hasMore to false when reaching last page', async () => {
      // ARRANGE: Mock response where we're on page 1 but it's the only page
      const singlePageResponse: TMDBResponse<TMDBMovie> = {
        page: 1,
        results: [mockMovie1],
        total_pages: 1, // Only 1 page total
        total_results: 20
      }
      mockedTmdbService.getPopularMovies.mockResolvedValue(singlePageResponse)

      // ACT: Render the hook
      const { result } = renderHook(() => usePopularMovies())

      // ASSERT: Wait for load to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Hook logic: setHasMore(pageNum < response.total_pages)
      // fetchMovies() is called with pageNum=1 initially
      // So: setHasMore(1 < 1) = setHasMore(false)
      expect(result.current.hasMore).toBe(false)
    })

    // Refresh functionality
    it('should refresh movies when refresh is called', async () => {
      // ARRANGE: Mock different responses for initial load and refresh
      const refreshResponse: TMDBResponse<TMDBMovie> = {
        page: 1,
        results: [mockMovie2], // Different movie for refresh
        total_pages: 3,
        total_results: 60
      }

      mockedTmdbService.getPopularMovies
        .mockResolvedValueOnce(mockPage1Response) // Initial load
        .mockResolvedValueOnce(refreshResponse)   // Refresh call

      // ACT: Render the hook
      const { result } = renderHook(() => usePopularMovies())

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.movies).toEqual([mockMovie1])

      // ACT: Call refresh
      await act(async () => {
        result.current.refresh()
      })

      // Wait for refresh to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // ASSERT: Should have refreshed data
      expect(result.current.movies).toEqual([mockMovie2])
      expect(mockedTmdbService.getPopularMovies).toHaveBeenCalledTimes(2)
      expect(mockedTmdbService.getPopularMovies).toHaveBeenNthCalledWith(2, 1) // Refresh calls page 1
    })

    // Prevent multiple simultaneous loads
    it('should not load more when already loading', async () => {
      // ARRANGE: Mock slow API response
      mockedTmdbService.getPopularMovies.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve(mockPage1Response), 100))
      )

      // ACT: Render the hook
      const { result } = renderHook(() => usePopularMovies())

      // Verify it's loading
      expect(result.current.loading).toBe(true)

      // ACT: Try to call loadMore while loading
      act(() => {
        result.current.loadMore()
      })

      // ASSERT: Should only be called once (from useEffect)
      expect(mockedTmdbService.getPopularMovies).toHaveBeenCalledTimes(1)
    })
  })

  // useTopRatedMovies Hook
  describe('useTopRatedMovies', () => {
    
    // Basic functionality
    it('should work similarly to usePopularMovies but call different API', async () => {
      // ARRANGE: Mock successful API response
      mockedTmdbService.getTopRatedMovies.mockResolvedValue(mockPage1Response)

      // ACT: Render the hook
      const { result } = renderHook(() => useTopRatedMovies())

      // ASSERT: Wait for the API call to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Check that it called the correct API method
      expect(mockedTmdbService.getTopRatedMovies).toHaveBeenCalledWith(1)
      expect(result.current.movies).toEqual([mockMovie1])
    })

    // : Error handling for top rated
    it('should handle errors for top rated movies', async () => {
      // ARRANGE: Mock API error
      mockedTmdbService.getTopRatedMovies.mockRejectedValue(new Error('Top rated API error'))

      // ACT: Render the hook
      const { result } = renderHook(() => useTopRatedMovies())

      // ASSERT: Wait for error to be set
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBe('Top rated API error')
    })
  })

  // GROUP 3: Hook Interface Consistency
  describe('Hook Interface Consistency', () => {
    
    // : All hooks return same interface
    it('should return consistent interface across all movie hooks', async () => {
      // ARRANGE: Mock responses for both hooks
      mockedTmdbService.getPopularMovies.mockResolvedValue(mockPage1Response)
      mockedTmdbService.getTopRatedMovies.mockResolvedValue(mockPage1Response)

      // ACT: Render both hooks
      const { result: popularResult } = renderHook(() => usePopularMovies())
      const { result: topRatedResult } = renderHook(() => useTopRatedMovies())

      // ASSERT: Both should have same interface
      const expectedKeys = ['movies', 'loading', 'error', 'hasMore', 'loadMore', 'refresh']
      
      expectedKeys.forEach(key => {
        expect(popularResult.current).toHaveProperty(key)
        expect(topRatedResult.current).toHaveProperty(key)
      })

      // Check types
      expect(typeof popularResult.current.loadMore).toBe('function')
      expect(typeof topRatedResult.current.refresh).toBe('function')
      expect(Array.isArray(popularResult.current.movies)).toBe(true)
      expect(typeof popularResult.current.loading).toBe('boolean')
    })
  })

  // GROUP 4: Edge Cases
  describe('Edge Cases', () => {
    
    // : Empty results
    it('should handle empty results from API', async () => {
      // ARRANGE: Mock empty response
      const emptyResponse: TMDBResponse<TMDBMovie> = {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0
      }
      mockedTmdbService.getPopularMovies.mockResolvedValue(emptyResponse)

      // ACT: Render the hook
      const { result } = renderHook(() => usePopularMovies())

      // ASSERT: Wait for load to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.movies).toEqual([])
      expect(result.current.hasMore).toBe(false) // page 1 === total_pages 1
      expect(result.current.error).toBe(null)
    })

    // : Non-Error object thrown
    it('should handle non-Error exceptions', async () => {
      // ARRANGE: Mock non-Error exception
      mockedTmdbService.getPopularMovies.mockRejectedValue('String error')

      // ACT: Render the hook
      const { result } = renderHook(() => usePopularMovies())

      // ASSERT: Wait for error to be set
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBe('Failed to fetch movies')
    })
  })
})