import { ArticleWithAuthorAndCategory } from "@/@types/article";
import DOMPurify from "dompurify";

interface Props {
  article: ArticleWithAuthorAndCategory;
}

export default function ArticleMain({ article }: Props) {
  const sanitizedContent = DOMPurify.sanitize(article.content);

  return (
    <main
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
