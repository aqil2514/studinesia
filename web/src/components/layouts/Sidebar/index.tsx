import NewsletterForm from "@/components/molecules/forms/NewsletterForm";
import SidebarCategories from "@/components/organisms/sidebar/CategoriesSidebar";
import PopularArticlesSidebar from "@/components/organisms/sidebar/PopularArticleSidebar";

export default function Sidebar() {
  return (
    <aside className="bg-white sticky top-0 self-start">
      <PopularArticlesSidebar />
      <SidebarCategories />
      <NewsletterForm />
    </aside>
  );
}
