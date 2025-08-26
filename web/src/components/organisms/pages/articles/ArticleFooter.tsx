import { ArticleWithAuthorAndCategory } from "@/@types/article";
import ShareButtons from "@/components/molecules/share/ShareButtons";
import { baseSiteUrl } from "@/config/baseUrl";
import { rubik } from "@/config/fonts";
import { Separator } from "@radix-ui/react-separator";
import NewestArticlesSidebar from "../../sidebar/NewestArticleSidebar";

interface Props {
  article: ArticleWithAuthorAndCategory;
}

export default function ArticleFooter({ article }: Props) {
  return (
    <footer className="p-4 bg-white">
      <Separator />
      <div>
        <div className="space-y-2">
          <p className={`${rubik.className}`}>Bagikan Artikel :</p>
          <ShareButtons
            url={`${baseSiteUrl}/articles/${article.slug}`}
            title={article.title}
          />
        </div>
        <div className="space-y-2">
          <NewestArticlesSidebar />
        </div>
      </div>
    </footer>
  );
}
