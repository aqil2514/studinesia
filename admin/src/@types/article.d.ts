export interface Article {
  id?: string;
  author: string | null;
  title: string;
  slug: string;
  description: string;
  metaDescription: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  updatedAt?: string;
  content: string;
  category: string;
  tags: string[];
  readingTime?: number;
}
