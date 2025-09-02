# FILMAX - Movie Recommendation App

A modern, responsive movie recommendation application that helps users discover and explore movies. Built with Next.js 15, TypeScript, and The Movie Database (TMDB) API, FILMAX offers a Netflix-like experience with user authentication, movie browsing, search functionality, and detailed movie information.

## 🚀 Live Demo

**[View Live Application](https://your-deployment-url.vercel.app)** *(To be updated after deployment)*

### Test Credentials
Since the app uses localStorage-based authentication, you can:
- **Register**: Create a new account with any email/password
- **Demo Account**: Register with `demo@filmax.com` / `password123` for testing

## ✨ Features

### 🎬 Movie Discovery
- **Browse Movies**: Explore trending, popular, and top-rated movies
- **Movie Details**: View comprehensive information including cast, crew, ratings, and overview
- **Search**: Real-time search functionality to find movies by title or keywords
- **Categories**: Navigate through different movie sections (Discovery, Coming Soon, Top Rated)

### 🔐 Authentication
- **User Registration**: Create new accounts with email and password
- **Secure Login**: User authentication with session persistence
- **Protected Routes**: Secure access to main application features
- **User Profile**: Personalized user experience with profile management

### 🎨 User Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, Netflix-inspired interface with dark theme
- **Loading States**: Smooth loading indicators and skeleton screens
- **Interactive Elements**: Hover effects, smooth transitions, and intuitive navigation

### ⚡ Performance
- **Fast Loading**: Optimized image loading and code splitting
- **Caching**: Efficient API response caching
- **Pagination**: Optimized data loading for better performance

## 🛠️ Technology Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS 4** - Utility-first CSS framework
- **TMDB API** - The Movie Database API for movie data
- **Axios** - HTTP client for API requests
- **Lucide React** - Modern icon library
- **ESLint** - Code linting and formatting
- **Turbopack** - Fast bundler for development

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Main homepage
│   └── globals.css     # Global styles
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Sidebar.tsx     # Left navigation sidebar
│   ├── HeroSection.tsx # Featured movie section
│   ├── ContinueWatching.tsx # Continue watching carousel
│   ├── RightSidebar.tsx # Top movies and genres
│   ├── StudioLogos.tsx # Studio logos section
│   └── LoadingSpinner.tsx # Loading component
├── hooks/              # Custom React hooks
│   ├── useMovies.ts    # Movie data hooks
│   ├── useSearch.ts    # Search functionality
│   └── useMovieDetails.ts # Movie details
├── lib/                # Utility functions and API clients
│   └── tmdb.ts         # TMDB API service
├── config/             # Configuration files
│   └── env.ts          # Environment configuration
└── types/              # TypeScript type definitions
    └── movie.ts        # Movie-related types
```

## API Integration

The app integrates with TMDB API to fetch:
- Popular movies (featured in hero section)
- Top-rated movies (right sidebar)
- Now playing movies (continue watching section)
- Upcoming movies
- Movie search results
- Movie details and cast
- Similar and recommended movies

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm
- TMDB API key (get one free at [themoviedb.org](https://www.themoviedb.org/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/movies-recommendation-app.git
   cd movies-recommendation-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Authentication
The app uses client-side authentication with localStorage. Simply register a new account or use the demo credentials above.

## 🎮 How to Use

1. **Create Account**: Register with your name, email, and password
2. **Login**: Access the app with your credentials
3. **Browse Movies**: Explore different categories from the sidebar
4. **Search**: Use the search bar to find specific movies
5. **View Details**: Click on any movie to see detailed information
6. **Navigate**: Use the sidebar to switch between sections
7. **Logout**: Click on your profile in the header to logout

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Deploy to GitHub Pages
1. Push your code to GitHub
2. Configure Next.js for static export
3. Set up GitHub Actions for deployment
4. Add environment variables in GitHub secrets

### Build for Production
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project uses data from [The Movie Database (TMDB)](https://www.themoviedb.org/). Please refer to TMDB's terms of service for data usage guidelines.

