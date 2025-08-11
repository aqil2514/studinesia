import { ArticleSummary } from "@/@types/article";
import Placeholder from "@/components/atoms/images/Placeholder";
import { rubik } from "@/config/fonts";
import { formatDateWithDay } from "@/utils/date";

interface ArticleCardProps {
  articleSummary: ArticleSummary;
}

export default function ArticleCard({ articleSummary }: ArticleCardProps) {
  const { description, publishedAt, title } = articleSummary;
  return (
    <div className="bg-white h-[450px] w-[350px] shadow-2xl rounded-2xl group">
      <div className="overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        <Placeholder
          width={350}
          height={180}
          className="rounded-tl-2xl rounded-tr-2xl group-hover:scale-105 duration-200"
        />
      </div>
      <div className="space-y-4 mt-4 px-4 relative">
        <p
          className={`${rubik.className} text-sky-500 group-hover:underline text-center`}
        >
          {title}
        </p>
        <p className="text-center">{formatDateWithDay(publishedAt)}</p>

        <p className={`${rubik.className} text-justify line-clamp-4`}>
          {description}
        </p>
        <br />
      </div>
    </div>
  );
}
