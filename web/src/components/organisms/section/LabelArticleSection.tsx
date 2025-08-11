"use client";

import { ArticleSummary } from "@/@types/article";
import Divider from "@/components/atoms/divider/Divider";
import LabelArticleCard from "@/components/molecules/cards/LabelArticleCard";
import { Button } from "@/components/ui/button";
import { rubik } from "@/config/fonts";
import Link from "next/link";
import { BsFillSkipForwardFill } from "react-icons/bs";

interface Props {
  title: string;
  articles: ArticleSummary[];
  slug: string;
}

export default function LabelArticleSection({ title, articles, slug }: Props) {
  return (
    <section className="space-y-4 mt-4 flex flex-col justify-center items-center">
      <h2 className={`${rubik.className} text-center text-3xl text-gray-500`}>
        {title}
      </h2>
      <Divider className="border-2 border-orange-400 w-1/6" />
      <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {articles.map((article, index) => (
          <LabelArticleCard articleSummary={article} key={index} />
        ))}
      </div>
      <Link href={`/label/${slug}`} className="w-1/5 mt-4">
        <Button variant={"outline"} className="w-full">
          <BsFillSkipForwardFill />
        </Button>
      </Link>
    </section>
  );
}
