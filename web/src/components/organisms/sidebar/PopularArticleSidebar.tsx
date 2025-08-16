import { ArticleWithAuthorAndCategory } from "@/@types/article";
import { ArticleListCardSkeleton } from "@/components/molecules/skeletons/ArticleListSkeleton";
import ArticleListCard from "@/components/molecules/cards/ArticleListCard";
import { getPublishedArticles } from "@/lib/api-client/article.api";
import { mapArticleToSummarized } from "@/lib/mapper/article.map";
import useSWR from "swr";
import React from "react";

export default function PopularArticlesSidebar() {
  const { data, isLoading } = useSWR("articles", getPublishedArticles);

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

const DataSection: React.FC<{ data: ArticleWithAuthorAndCategory[] }> = ({
  data,
}) => {
  const summarizedArticles = data.map(mapArticleToSummarized);

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
