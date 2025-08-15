import { Article } from "@/@types/article";
import { ArticleListCardSkeleton } from "@/components/atoms/skeletons/ArticleListSkeleton";
import ArticleListCard from "@/components/molecules/cards/ArticleListCard";
import { getPublishedArticles } from "@/lib/api-client/article.api";
import { mapArticleToSummarized } from "@/lib/mapper/article.map";
import useSWR from "swr";

export default function PopularArticlesSidebar() {
  const { data, isLoading } = useSWR("articles", getPublishedArticles);

  if (!data || isLoading)
    return (
      <aside className="bg-white p-4 rounded-lg shadow space-y-4">
        <h2 className="font-bold text-lg border-b pb-2">Artikel Terbaru</h2>
        {Array.from({ length: 5 }).map((_, i) => (
          <ArticleListCardSkeleton key={i + 1} />
        ))}
      </aside>
    );

  const articles: Article[] = data.articles;
  const summarizedArticles = articles.map(mapArticleToSummarized);

  return (
    <aside className="bg-white p-4 rounded-lg shadow space-y-4">
      <h2 className="font-bold text-lg border-b pb-2">Artikel Terbaru</h2>
      <ul className="space-y-3">
        {summarizedArticles.map((article, index) => (
          <li key={index} className="flex items-center gap-3">
            <ArticleListCard article={article} />
          </li>
        ))}
      </ul>
    </aside>
  );
}
