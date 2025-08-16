export interface Article {
  id: number;
  author_id: number;
  title: string;
  slug: string;
  description: string;
  meta_description: string;
  url: string | null;
  url_to_image: string;
  published_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  content: string; // HTML string
  category_id: number;
  reading_time: number;
}

export interface ArticleWithAuthorAndCategory
  extends Omit<Article, "author_id" | "category_id"> {
  author_id: {
    id: number;
    name: string;
  };
  category_id: {
    id: number;
    name: string;
    slug: string;
  };
}

export type ArticleSummary = Pick<
  Article,
  "title" | "description" | "slug" | "published_at" | "url_to_image"
>;

export type ArticleFetchMode = "published";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description:string;
}
