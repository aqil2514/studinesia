import { ArticleSchemaType } from "@/schemas/article.schema";

type ArticleStatus = "draft" | "published" | "archived" | "scheduled";

export interface Article {
  id?: number;
  author: string | null;
  title: string;
  slug: string;
  description: string;
  metaDescription: string;
  urlToImage: string;
  publishedAt: string;
  updatedAt?: string;
  content: string;
  category: string;
  tags: string[];
  readingTime?: number;
  status?: ArticleStatus;
}

export interface ArticleDB {
  id?: number;
  author_id?: number | null;
  title: string;
  slug: string;
  description?: string | null;
  meta_description?: string | null;
  url_to_image?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
  content: string;
  category_id: number;
  reading_time?: number | null;
  deleted_at?: string;
  image_alt: string;
  image_caption: string;
  status?: ArticleStatus;
}

export interface ArticleMapperFc {
  mapArticleFormToDB: (formData: FormData, imageUrl: string) => ArticleDB;
  mapArticleDBToForm: (
    raw: ArticleWithAuthorAndCategory
  ) => ArticleSchemaTypeWithImageUrl;
  mapArticleDataToFormData: (raw: ArticleSchemaType) => FormData;
  mapArticleDbToSummarizedArticle: (raw: ArticleWithAuthorAndCategory) => ArticleSummary;
}

export interface ArticleServerApi {
  getArticles: (params?: GetArticlesParams | undefined) => Promise<ArticleDB[]>;
}

export interface ArticleWithAuthorAndCategory
  extends Omit<ArticleDB, "author_id" | "category_id"> {
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
  id?: number;
  created_at?: string;
  article_id: number;
  tag_id: number;
}

export type ArticleSummary = Pick<
  ArticleDB,
  "title" | "description" | "slug" | "published_at" | "url_to_image" | "status"
> & {
  category: string;
  author: string;
};

export interface GetArticlesParams {
  mode?: string;
  type?: "full" | "summarized";
  category_id?: string;
  limit?: number;
  page?: number;
}
