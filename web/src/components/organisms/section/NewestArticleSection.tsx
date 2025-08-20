"use client";

import { ArticleWithAuthorAndCategory } from "@/@types/article";
import Divider from "@/components/atoms/divider/Divider";
import ArticleCard from "@/components/molecules/cards/ArticleCard";
import ArticleCardSkeleton from "@/components/molecules/skeletons/ArticleCardSkeleton";
import { Button } from "@/components/ui/button";
import { rubik } from "@/config/fonts";
import { getNewestArticles } from "@/lib/api-client/article.api";
import { mapArticleToSummarized } from "@/lib/mapper/article.map";
import Link from "next/link";
import React from "react";
import { BsFillSkipForwardFill } from "react-icons/bs";
import useSWR from "swr";

export default function NewestArticleSection() {
  const { data, isLoading } = useSWR("newest-articles", getNewestArticles);

  if (!data || isLoading) return <SkeletonSection />;

  return <DataSection data={data} />;
}

const SkeletonSection: React.FC = () => {
  const fetchData = Array.from({ length: 6 });

  return (
    <section className="space-y-4 mt-4 flex flex-col justify-center items-center">
      <h2 className={`${rubik.className} text-center text-3xl text-gray-500`}>
        Artikel Terbaru
      </h2>
      <Divider className="border-2 border-orange-400 w-1/6" />
      <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {fetchData.map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
      <Link href={`/articles`} className="w-1/5 mt-4">
        <Button variant={"outline"} className="w-full">
          <BsFillSkipForwardFill />
        </Button>
      </Link>
    </section>
  );
};

const DataSection: React.FC<{ data: ArticleWithAuthorAndCategory[] }> = ({
  data,
}) => {
  const summarizedArticles = data.map(mapArticleToSummarized);
  
  return (
    <section className="space-y-4 mt-4 flex flex-col justify-center items-center">
      <h2 className={`${rubik.className} text-center text-3xl text-gray-500`}>
        Artikel Terbaru
      </h2>
      <Divider className="border-2 border-orange-400 w-1/6" />
      <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {summarizedArticles.map((article, index) => (
          <ArticleCard articleSummary={article} key={index} />
        ))}
      </div>
      <Link href={`/articles`} className="w-1/5 mt-4">
        <Button variant={"outline"} className="w-full">
          <BsFillSkipForwardFill />
        </Button>
      </Link>
    </section>
  );
};
