import { Article, ArticleSummary, ArticleWithAuthorAndCategory } from "@/@types/article";

export function mapArticleToSummarized(raw: Article | ArticleWithAuthorAndCategory): ArticleSummary {
  const result: ArticleSummary = {
    description: raw.description,
    url_to_image: raw.url_to_image,
    published_at: raw.published_at,
    slug: raw.slug,
    title: raw.title,
  };

  return result;
}
