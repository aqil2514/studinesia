import ArticleTemplate from "@/components/templates/article/ArticleTemplate";
import { articleMapper } from "@/lib/mappers/article.mapper";
import { articleApiServer } from "@/lib/api-server/article.api";
import { Metadata } from "next";
import { GetArticlesParams } from "@/@types/article";

export const metadata: Metadata = {
  title: "Artikel",
};
const { getArticlesWithRelations } = articleApiServer;
const { mapArticleDbToSummarizedArticle } = articleMapper;

interface Props {
  searchParams: Promise<GetArticlesParams>;
}

export const dynamic = "force-dynamic";

export default async function ArticlePage({ searchParams }: Props) {
  const { limit, page } = await searchParams;

  const { success, data } = await getArticlesWithRelations({
    type: "full",
    limit,
    page
  });

  if (!success || !data)
    throw new Error("Terjadi kesalahan saat mengambil data artikel");
  const { articles: raw, count } = data;

  const articles = raw.map(mapArticleDbToSummarizedArticle);

  return <ArticleTemplate articles={articles} count={count!} />;
}
