import { ArticleSummary } from "@/@types/article";
import ArticleListCard from "@/components/molecules/cards/ArticleListCard";

interface PopularArticlesSidebarProps {
  articles: ArticleSummary[];
  title?: string;
}

export default function PopularArticlesSidebar({
  articles,
  title = "Artikel Populer",
}: PopularArticlesSidebarProps) {
  return (
    <aside className="bg-white p-4 rounded-lg shadow space-y-4">
      <h2 className="font-bold text-lg border-b pb-2">{title}</h2>
      <ul className="space-y-3">
        {articles.map((article, index) => (
          <li key={index} className="flex items-center gap-3">
            <ArticleListCard article={article} />
          </li>
        ))}
      </ul>
    </aside>
  );
}
