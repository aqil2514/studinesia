import { ArticleWithAuthorAndCategory } from "@/@types/article";
import Divider from "@/components/atoms/divider/Divider";
import TwoStepBreadcrumb from "@/components/molecules/breadcrumbs/TwoStepBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { rubik } from "@/config/fonts";
import { formatToLocalTime } from "@/lib/utils";
import { Pen, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BiSolidCategory } from "react-icons/bi";
import { FaBookReader } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";

interface Props {
  article: ArticleWithAuthorAndCategory;
}

export default function ArticleHeader({ article }: Props) {
  return (
    <header className="space-y-8">
      <TwoStepBreadcrumb
        currentStepName={article.title}
        secondStepName={article.category_id.name}
        secondStepLink={`/category/${article.category_id.slug}`}
      />
      <h1 className={`text-center ${rubik.className} text-4xl`}>
        {article.title}
      </h1>
      <Divider />
      <div className="space-y-8">
        <div className="flex justify-center gap-4">
          <span className="flex gap-2 items-center">
            <Pen /> {article.author_id.name}
          </span>
          <Link href={`/category/${article.category_id.slug}`}>
            <span className="flex gap-2 items-center">
              <BiSolidCategory /> {article.category_id.name}
            </span>
          </Link>
          <span className="flex gap-2 items-center">
            <FaBookReader />
            {article.reading_time} Menit Membaca
          </span>
        </div>
        <span className="text-center flex gap-4 items-center justify-center">
          <Timer /> {formatToLocalTime(article.published_at)}
        </span>
      </div>
      <Divider />
      <div className="flex justify-center items-center gap-4 flex-wrap">
        <IoPricetagsOutline />{" "}
        {article.tags.map((tag) => (
          <Badge key={tag} variant={"outline"}>
            {tag}
          </Badge>
        ))}
      </div>
      <figure className="text-center space-y-4">
        <Image
          src={article.url_to_image}
          height={523}
          width={720}
          alt={article.image_alt}
          priority
          className="rounded-2xl block mx-auto"
        />
        <figcaption>{article.image_caption}</figcaption>
      </figure>
      <Divider />
    </header>
  );
}
