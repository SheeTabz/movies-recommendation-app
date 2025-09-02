import { FeaturedMovie, TrendingMovie } from '@/types/movie';

export const featuredMovie: FeaturedMovie = {
  title: "Keluarga Cemara",
  description: "This film depicts a very desirable family without any problems and always get along every day, until a father figure leaves his family, and everything changes.",
  isNew: true
};

export const trendingMovies: TrendingMovie[] = [
  {
    id: "1",
    category: "Horror",
    categoryColor: "bg-red-600",
    title: "Zombie Joget"
  },
  {
    id: "2",
    category: "Family",
    categoryColor: "bg-blue-600",
    title: "Family 100K"
  },
  {
    id: "3",
    category: "Documentary",
    categoryColor: "bg-green-600",
    title: "Pesawat Kertas"
  },
  {
    id: "4",
    category: "Romance",
    categoryColor: "bg-pink-600",
    title: "Surat Cinta Starling"
  },
  {
    id: "5",
    category: "Action",
    categoryColor: "bg-orange-600",
    title: "Fast & Furious"
  },
  {
    id: "6",
    category: "Comedy",
    categoryColor: "bg-yellow-500",
    title: "Laugh Out Loud"
  }
];
