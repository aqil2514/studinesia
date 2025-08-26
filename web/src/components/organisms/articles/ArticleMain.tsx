import { ArticleWithAuthorAndCategory } from "@/@types/article";
import Loading from "@/app/loading";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import DOMPurify from "dompurify";

interface Props {
  article: ArticleWithAuthorAndCategory;
}

export default function ArticleMain({ article }: Props) {
  const hasHydrated = useHasHydrated();

  if(!hasHydrated) return <Loading />
  const sanitizedContent = DOMPurify.sanitize(article.content);

  return (
    <main
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
