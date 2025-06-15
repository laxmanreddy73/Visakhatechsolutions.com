export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  url: string;
  source: string;
  category: string;
  author: {
    name: string;
    avatar?: string;
  };
  readingTime: number;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
}