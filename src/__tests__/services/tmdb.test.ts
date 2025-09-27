import { describe, it, expect } from 'vitest'
import { getImageUrl, getBackdropUrl, getPosterUrl } from '@/lib/tmdb'


// testing the TMDB service which handles movie data from The Movie Database API


describe('TMDB Service', () => {

  // GROUP 1: Helper Functions
  // These are pure functions - they take input and return output without side effects

  describe('Helper Functions', () => {
    
    //  Image URL generation with valid path
    it('should generate correct image URL with valid path', () => {
      // ARRANGE: We have a poster path from TMDB
      const posterPath = '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
      
      // ACT: Generate the full URL
      const result = getImageUrl(posterPath, 'w500')

      // ASSERT: Should create the correct TMDB image URL
      expect(result).toBe('https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg')
    })

    //  Null path handling
    it('should return placeholder for null image path', () => {
      // ARRANGE: Sometimes TMDB doesn't have an image
      const posterPath = null
      
      // ACT: Generate URL with null path
      const result = getImageUrl(posterPath)

      // ASSERT: Should return placeholder image
      expect(result).toBe('/placeholder-movie.jpg')
    })

    //  Default size parameter
    it('should use default size when not specified', () => {
      // ACT: Don't specify size parameter
      const result = getImageUrl('/test-poster.jpg')

      // ASSERT: Should default to w500 size
      expect(result).toBe('https://image.tmdb.org/t/p/w500/test-poster.jpg')
    })

    //  Different image sizes
    it('should handle different image sizes correctly', () => {
      const posterPath = '/poster.jpg'
      
      // ACT: Test different sizes
      const small = getImageUrl(posterPath, 'w185')
      const medium = getImageUrl(posterPath, 'w342') 
      const large = getImageUrl(posterPath, 'w780')
      const original = getImageUrl(posterPath, 'original')

      // ASSERT: Each should have correct size in URL
      expect(small).toBe('https://image.tmdb.org/t/p/w185/poster.jpg')
      expect(medium).toBe('https://image.tmdb.org/t/p/w342/poster.jpg')
      expect(large).toBe('https://image.tmdb.org/t/p/w780/poster.jpg')
      expect(original).toBe('https://image.tmdb.org/t/p/original/poster.jpg')
    })

    //  Backdrop URL generation
    it('should generate correct backdrop URL', () => {
      // ACT
      const result = getBackdropUrl('/backdrop.jpg', 'w1280')

      // ASSERT
      expect(result).toBe('https://image.tmdb.org/t/p/w1280/backdrop.jpg')
    })

    //  Backdrop placeholder
    it('should return placeholder for null backdrop', () => {
      // ACT
      const result = getBackdropUrl(null)

      // ASSERT: Different placeholder for backdrops
      expect(result).toBe('/placeholder-backdrop.jpg')
    })

    //  Poster URL with different sizes
    it('should generate poster URLs with different sizes', () => {
      const posterPath = '/fight-club.jpg'
      
      // ACT: Test poster-specific function
      const thumbnail = getPosterUrl(posterPath, 'w154')
      const medium = getPosterUrl(posterPath, 'w342')
      const large = getPosterUrl(posterPath, 'w500')

      // ASSERT
      expect(thumbnail).toBe('https://image.tmdb.org/t/p/w154/fight-club.jpg')
      expect(medium).toBe('https://image.tmdb.org/t/p/w342/fight-club.jpg')
      expect(large).toBe('https://image.tmdb.org/t/p/w500/fight-club.jpg')
    })

    //  Edge cases
    it('should handle edge cases properly', () => {
      // Test empty string
      expect(getImageUrl('')).toBe('/placeholder-movie.jpg')
      
      // Test undefined (TypeScript allows this in some cases)
      expect(getImageUrl(undefined as unknown as string | null)).toBe('/placeholder-movie.jpg')
      
      // Test path without leading slash (function doesn't add slash)
      expect(getImageUrl('poster.jpg')).toBe('https://image.tmdb.org/t/p/w500poster.jpg')
    })
  })

  // GROUP 2: Service Structure
  // Test that the service has the expected structure and methods
  describe('Service Structure', () => {
    
    //  Service methods exist
    it('should have all required API methods', async () => {
      // Dynamic import to avoid module loading issues
      const { tmdbService } = await import('@/lib/tmdb')
      
      // ASSERT: All methods should exist and be functions
      expect(typeof tmdbService.getPopularMovies).toBe('function')
      expect(typeof tmdbService.getTopRatedMovies).toBe('function')
      expect(typeof tmdbService.getNowPlayingMovies).toBe('function')
      expect(typeof tmdbService.getUpcomingMovies).toBe('function')
      expect(typeof tmdbService.getMovieDetails).toBe('function')
      expect(typeof tmdbService.searchMovies).toBe('function')
      expect(typeof tmdbService.getMovieGenres).toBe('function')
      expect(typeof tmdbService.getSimilarMovies).toBe('function')
      expect(typeof tmdbService.getRecommendedMovies).toBe('function')
    })

    //  Method signatures
    it('should have methods with correct signatures', async () => {
      const { tmdbService } = await import('@/lib/tmdb')
      
      // ASSERT: Methods should have expected parameter lengths
      // getPopularMovies(page = 1) - 0 or 1 parameter
      expect(tmdbService.getPopularMovies.length).toBe(0) // Default parameter doesn't count
      
      // searchMovies(query, page = 1) - 1 required parameter
      expect(tmdbService.searchMovies.length).toBe(1)
      
      // getMovieDetails(movieId) - 1 required parameter
      expect(tmdbService.getMovieDetails.length).toBe(1)
    })
  })

  // GROUP 3: Type Safety
  describe('Type Safety', () => {
    
    //  Helper functions return strings
    it('should return strings from helper functions', () => {
      const imageUrl = getImageUrl('/test.jpg')
      const backdropUrl = getBackdropUrl('/backdrop.jpg')
      const posterUrl = getPosterUrl('/poster.jpg')

      expect(typeof imageUrl).toBe('string')
      expect(typeof backdropUrl).toBe('string')
      expect(typeof posterUrl).toBe('string')
    })

    //  URLs are well-formed
    it('should return well-formed URLs', () => {
      const imageUrl = getImageUrl('/test.jpg')
      
      // Should start with https://
      expect(imageUrl.startsWith('https://')).toBe(true)
      
      // Should contain TMDB domain
      expect(imageUrl.includes('image.tmdb.org')).toBe(true)
      
      // Should end with the image path
      expect(imageUrl.endsWith('/test.jpg')).toBe(true)
    })
  })

  // GROUP 4: Business Logic
  describe('Business Logic', () => {
    
    //  Image size validation
    it('should handle all valid image sizes', () => {
      const validSizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'] as const
      
      validSizes.forEach(size => {
        const result = getImageUrl('/test.jpg', size)
        expect(result).toContain(`/${size}/`)
      })
    })

    //  Backdrop size validation  
    it('should handle all valid backdrop sizes', () => {
      const validBackdropSizes = ['w300', 'w780', 'w1280', 'original'] as const
      
      validBackdropSizes.forEach(size => {
        const result = getBackdropUrl('/backdrop.jpg', size)
        expect(result).toContain(`/${size}/`)
      })
    })

    //  Consistent placeholder behavior
    it('should use consistent placeholder behavior', () => {
      // All image functions should handle null consistently
      expect(getImageUrl(null)).toBe('/placeholder-movie.jpg')
      expect(getPosterUrl(null)).toBe('/placeholder-movie.jpg')
      expect(getBackdropUrl(null)).toBe('/placeholder-backdrop.jpg')
    })
  })
})
