import NewsletterForm from "@/components/molecules/forms/NewsletterForm";
import SidebarCategories from "@/components/organisms/sidebar/CategoriesSidebar";
import NewestArticlesSidebar from "@/components/organisms/sidebar/NewestArticleSidebar";

export default function Sidebar() {
  return (
    <aside className="bg-white sticky top-24 h-[calc(100vh-2rem)] overflow-y-auto flex flex-col gap-4 pt-8 pb-16 rounded-lg shadow">
      <NewestArticlesSidebar />
      <SidebarCategories />
      <NewsletterForm />
    </aside>
  );
}
