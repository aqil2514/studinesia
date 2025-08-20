import NewsletterForm from "@/components/molecules/forms/NewsletterForm";
import SidebarCategories from "@/components/organisms/sidebar/CategoriesSidebar";
import NewestArticlesSidebar from "@/components/organisms/sidebar/NewestArticleSidebar";

export default function Sidebar() {
  return (
    <aside className="bg-white relative">
      <NewestArticlesSidebar />
      <SidebarCategories />
      <div className="sticky top-0 self-start">

      <NewsletterForm />
      </div>
    </aside>
  );
}
