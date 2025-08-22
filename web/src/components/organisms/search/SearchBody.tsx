import { ArticleSummary } from "@/@types/article";
import ArticleCard from "@/components/molecules/cards/ArticleCard";
import React from "react";

interface Props {
  articles: ArticleSummary[];
  query: string;
}
export default function SearchBody({ articles, query }: Props) {
  if (articles.length === 0) return <NoDataComponent query={query} />;

  return <DataComponent articles={articles} />;
}

const NoDataComponent: React.FC<{ query: string }> = ({ query }) => {
  return (
    <div className="text-center py-20">
      <p className="text-gray-500">
        😕 Tidak ditemukan artikel untuk &quot;{query}&quot;.
      </p>
      <p className="text-sm text-gray-400">Coba gunakan kata kunci lain.</p>
    </div>
  );
};

const DataComponent: React.FC<{ articles: ArticleSummary[] }> = ({
  articles,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard articleSummary={article} key={article.slug} />
      ))}
    </div>
  );
};
