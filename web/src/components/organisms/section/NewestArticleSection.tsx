"use client";

import { ArticleSummary } from "@/@types/article";
import Divider from "@/components/atoms/divider/Divider";
import ArticleCard from "@/components/molecules/cards/ArticleCard";
import { Button } from "@/components/ui/button";
import { rubik } from "@/config/fonts";
import Link from "next/link";
import { BsFillSkipForwardFill } from "react-icons/bs";

interface Props {
  articles: ArticleSummary[];
}

export default function NewestArticleSection({ articles }: Props) {
  return (
    <section className="space-y-4 mt-4 flex flex-col justify-center items-center">
      <h2 className={`${rubik.className} text-center text-3xl text-gray-500`}>
        Artikel Terbaru
      </h2>
      <Divider className="border-2 border-orange-400 w-1/6" />
      <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {articles.map((article, index) => (
          <ArticleCard articleSummary={article} key={index} />
        ))}
      </div>
      <Link href={`/article`} className="w-1/5 mt-4">
        <Button variant={"outline"} className="w-full">
          <BsFillSkipForwardFill />
        </Button>
      </Link>
    </section>
  );
}
