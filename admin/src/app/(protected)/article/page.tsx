import ArticleTemplate from "@/components/templates/article/ArticleTemplate";
import { articleMapper } from "@/lib/mappers/article.mapper";
import { articleApiServer } from "@/lib/api-server/article.api";
import { Metadata } from "next";
import { Filter, FilterOperator, QueryOptions } from "@/@types/query";
import { getAllCategory } from "@/lib/api-server/category.api";

export const metadata: Metadata = {
  title: "Artikel",
};
const { getArticles } = articleApiServer;
const { mapArticleDbToSummarizedArticle } = articleMapper;

interface SearchParamsQuery {
  page: string;
  limit: string;
  filter: string[] | string;
}

interface Props {
  searchParams: Promise<SearchParamsQuery>;
}

export const dynamic = "force-dynamic";

export default async function ArticlePage({ searchParams }: Props) {
  const { limit, page, filter } = await searchParams;
  const arrayFilter = Array.isArray(filter) ? filter : filter ? [filter] : [];

  const filters: Filter[] = arrayFilter.map((f) => {
    const [key, operator, value] = f.split(":");

    return {
      key,
      operator: operator as FilterOperator,
      value,
    };
  });

  const query: QueryOptions = {
    limit: Number(limit),
    page: Number(page),
    filters,
    select: "*, author_id(name, id), category_id(id, name, slug)",
    sort: [{ key: "published_at", direction: "desc" }],
  };

  const { articles, count } = await getArticles(query);
  const categories = await getAllCategory();

  const summarized = articles.map(mapArticleDbToSummarizedArticle);

  return (
    <ArticleTemplate
      articles={summarized}
      count={count!}
      categories={categories}
    />
  );
}
