import ArticleTemplate from "@/components/templates/article/ArticleTemplate";
import { mapArticleDbToSummarizedArticle } from "@/lib/mappers/article.mapper";
import { getArticles } from "@/lib/server-api/article.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel",
};

export default async function ArticlePage() {
  const raw = await getArticles();
  const articles = raw.map(mapArticleDbToSummarizedArticle);

  return <ArticleTemplate articles={articles} />;
}
