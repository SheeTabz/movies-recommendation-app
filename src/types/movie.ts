export interface Movie {
  id: string;
  title: string;
  description: string;
  isNew?: boolean;
  category: string;
  categoryColor: string;
  imageUrl?: string;
  rating?: number;
  year?: number;
  duration?: string;
}

export interface FeaturedMovie {
  title: string;
  description: string;
  isNew?: boolean;
}

export interface TrendingMovie {
  id: string;
  category: string;
  categoryColor: string;
  imageUrl?: string;
  title?: string;
}
