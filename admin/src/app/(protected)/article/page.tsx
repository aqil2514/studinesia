import ArticleTemplate from "@/components/templates/article/ArticleTemplate";
import { articleMapper } from "@/lib/mappers/article.mapper";
import { getArticles } from "@/lib/server-api/article.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel",
};

export default async function ArticlePage() {
  const raw = await getArticles({ type: "full" });
  const { mapArticleDbToSummarizedArticle } = articleMapper;
  const articles = raw.map(mapArticleDbToSummarizedArticle);

  return <ArticleTemplate articles={articles} />;
}
