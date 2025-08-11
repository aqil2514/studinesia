import { ArticleSummary } from "@/@types/article";
import Placeholder from "@/components/atoms/images/Placeholder";
import { formatDateWithDay } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";

interface Props {
  article: ArticleSummary;
}

export default function ArticleListCard({ article }: Props) {
  return (
    <>
      <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden">
        {article.image_url ? (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover"
          />
        ) : (
          <Placeholder height={48} width={64} />
        )}
      </div>
      <div>
        <Link
          href={`/articles/${article.slug}`}
          className="text-sm font-medium hover:text-blue-600 line-clamp-2"
        >
          {article.title}
        </Link>
        <p className="text-xs text-gray-500">
          {formatDateWithDay(article.publishedAt)}
        </p>
      </div>
    </>
  );
}
