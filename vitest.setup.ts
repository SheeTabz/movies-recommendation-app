// This file runs before all tests to set up the testing environment

import '@testing-library/jest-dom'

// Mock environment variables for tests
process.env.NEXT_PUBLIC_TMDB_API_KEY = 'test-api-key'
process.env.NEXT_PUBLIC_TMDB_BASE_URL = 'https://api.themoviedb.org/3'