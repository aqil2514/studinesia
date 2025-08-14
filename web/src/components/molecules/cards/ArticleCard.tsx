import { ArticleSummary } from "@/@types/article";
import Placeholder from "@/components/atoms/images/Placeholder";
import { rubik } from "@/config/fonts";
import { formatDateWithDay } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  articleSummary: ArticleSummary;
}

export default function ArticleCard({ articleSummary }: ArticleCardProps) {
  const { description, published_at, title, url_to_image, slug } =
    articleSummary;
  return (
    <Link href={`/articles/${slug}`}>
    <div className="bg-white h-[450px] w-[350px] shadow-2xl rounded-2xl group">
      <div className="overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        {url_to_image ? (
          <Image
            src={url_to_image}
            width={350}
            height={180}
            alt={`image ${title}`}
          />
        ) : (
          <Placeholder
            width={350}
            height={180}
            className="rounded-tl-2xl rounded-tr-2xl group-hover:scale-105 duration-200"
          />
        )}
      </div>
      <div className="space-y-4 mt-4 px-4 relative">
        <p
          className={`${rubik.className} text-sky-500 group-hover:underline text-center`}
        >
          {title}
        </p>
        <p className="text-center">{formatDateWithDay(published_at)}</p>

        <p className={`${rubik.className} text-justify line-clamp-4`}>
          {description}
        </p>
        <br />
      </div>
    </div>
    </Link>
  );
}
