import { ArticleListCardSkeleton } from "@/components/molecules/skeletons/ArticleListSkeleton";
import ArticleListCard from "@/components/molecules/cards/ArticleListCard";
import { mapArticleToSummarized } from "@/lib/mapper/article.map";
import useSWR from "swr";
import React from "react";
import { articleClientApi } from "@/lib/api-client/article.api";
import { ArticleWithRelationsResponse } from "@/@types/article";
import { QueryOptions } from "@/@types/supabase";
import { ArticleDBSelect } from "@/enums/article.enum";

export default function NewestArticlesSidebar() {
  const { getArticles } = articleClientApi;
  const query: QueryOptions = {
    limit: 10,
    filters: [{ key: "status", operator: "eq", value: "published" }],
    sort: [{ key: "published_at", direction: "desc" }],
    select: ArticleDBSelect.ARTICILE_WITH_RELATIONS,
  };
  const { data, isLoading } = useSWR("newest-articles", () =>
    getArticles(query)
  );

  if (!data || isLoading) return <SkeletonSection />;

  return <DataSection data={data} />;
}

const SkeletonSection: React.FC = () => {
  return (
    <aside className="bg-white p-4 rounded-lg shadow space-y-4">
      <h2 className="font-bold text-lg border-b pb-2">Artikel Terbaru</h2>
      {Array.from({ length: 5 }).map((_, i) => (
        <ArticleListCardSkeleton key={i + 1} />
      ))}
    </aside>
  );
};

const DataSection: React.FC<{ data: ArticleWithRelationsResponse }> = ({
  data,
}) => {
  console.log(data);
  const summarizedArticles = data.articles.map(mapArticleToSummarized);
  console.log(summarizedArticles);

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
};
