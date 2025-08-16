import { ArticleSummary } from "@/@types/article";
import Placeholder from "@/components/atoms/images/Placeholder";
import { Separator } from "@/components/ui/separator";
import { greatVibes, rubik } from "@/config/fonts";
import { formatDateWithDay } from "@/utils/date";
import Image from "next/image";

interface HighlightArticleCardProps {
  articleSummary: ArticleSummary;
}

export default function CategoryArticleCard({
  articleSummary,
}: HighlightArticleCardProps) {
  const { description, published_at, title, url_to_image } = articleSummary;
  return (
    <div className="bg-white h-[500px] w-[350px] shadow-2xl rounded-2xl group">
      {/* Gambar */}
      <div className="overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        {url_to_image ? (
          <Image
            src={url_to_image}
            width={350}
            height={180}
            className="rounded-tl-2xl rounded-tr-2xl group-hover:scale-105 duration-200"
            alt={`${title} ilustartion image`}
          />
        ) : (
          <Placeholder
            width={350}
            height={180}
            className="rounded-tl-2xl rounded-tr-2xl group-hover:scale-105 duration-200"
          />
        )}
      </div>
      {/* Teks */}
      <div className="space-y-4 mt-4 px-4 relative grid grid-rows-[auto_1fr_auto]">
        <p
          className={`${greatVibes.className} text-yellow-500 text-4xl font-extrabold bg-white absolute -top-15 left-[40%] p-2 rounded-full group-hover:rotate-12 duration-300 cursor-default select-none`}
        >
          S
        </p>
        <p
          className={`${rubik.className} text-sky-500 group-hover:underline text-center`}
        >
          {title}
        </p>
        <Separator />
        <p className={`${rubik.className} text-justify line-clamp-4`}>
          {description}
        </p>
        <br />
        <p className="text-right absolute bottom-0 right-5">{formatDateWithDay(published_at)}</p>
      </div>
    </div>
  );
}
