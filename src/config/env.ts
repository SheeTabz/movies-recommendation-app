// Environment configuration
export const config = {
  tmdb: {
    apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY || 'f6c7dffdbd70cd42fb51876ae019eae1',
  },
  nextAuth: {
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    secret: process.env.NEXTAUTH_SECRET || 'your-nextauth-secret-here',
  },
  database: {
    url: process.env.DATABASE_URL || 'your-database-url-here',
  },
};

// Instructions for setting up environment variables:
// 1. Create a .env.local file in the root directory
// 2. Add the following variables:
//    NEXT_PUBLIC_TMDB_API_KEY=your-tmdb-api-key-here
//    NEXTAUTH_URL=http://localhost:3000
//    NEXTAUTH_SECRET=your-nextauth-secret-here
//    DATABASE_URL=your-database-url-here
//
// 3. Get your TMDB API key from: https://www.themoviedb.org/settings/api
