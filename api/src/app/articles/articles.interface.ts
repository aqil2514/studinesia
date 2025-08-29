export type ArticleStatus = 'draft' | 'published' | 'archived' | 'scheduled';

export interface Article {
  id?: number;
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

export interface ArticleDB {
  id?: number;
  author_id?: number | null;
  title: string;
  slug: string;
  description?: string | null;
  meta_description?: string | null;
  url?: string | null;
  url_to_image?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
  content: string;
  category_id: number;
  reading_time?: number | null;
  deleted_at?: string;
  status: ArticleStatus;
}

export interface ArticleWithAuthorAndCategory
  extends Omit<ArticleDB, 'author_id' | 'category_id'> {
  author_id: {
    id: number;
    name: string;
  };
  category_id: {
    id: number;
    name: string;
    slug: string;
  };
  tags: string[];
}

export interface ArticleTags {
  id: number;
  created_at: string;
  article_id: number;
  tag_id: number;
}

export interface GetQueryArticle {
  mode: string;
  category_id: string;
  limit: number;
  page: number;
  type: "full" | "summarized";
}

// Ini masih dipakek di web
export interface ArticleHttpResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Ini masih dipakek di admin
export interface ArticleWithRelationsResponse {
  articles: ArticleWithAuthorAndCategory[];
  count?: number;
  page?: number;
  hasNext?: boolean;
}