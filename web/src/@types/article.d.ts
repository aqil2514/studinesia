export interface Article {
  image_url?: string;
  description: string;
  title: string;
  publishedAt: string;
  content: string;
  slug: string;
}

export type ArticleSummary = Pick<
  Article,
  "title" | "description" | "slug" | "publishedAt" | "image_url"
>;

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: React.ReactNode;
}
