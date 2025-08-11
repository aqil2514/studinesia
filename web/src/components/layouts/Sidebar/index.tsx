import NewsletterForm from "@/components/molecules/forms/NewsletterForm";
import SidebarCategories from "@/components/organisms/sidebar/CategoriesSidebar";
import PopularArticlesSidebar from "@/components/organisms/sidebar/PopularArticleSidebar";
import { dummyArticleSummaries } from "@/mocks/articles";

export default function Sidebar() {
  const articles = dummyArticleSummaries;

  return (
    <aside className="bg-white">
      <PopularArticlesSidebar
        articles={articles.slice(0, 5)}
        title="Artikel Terbaru"
      />
      <SidebarCategories />
      <NewsletterForm />
    </aside>
  );
}
