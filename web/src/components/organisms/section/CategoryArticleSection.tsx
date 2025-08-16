"use client";

import { ArticleSummary, ArticleWithAuthorAndCategory } from "@/@types/article";
import Divider from "@/components/atoms/divider/Divider";
import CategoryArticleCard from "@/components/molecules/cards/CategoryArticleCard";
import CategoryArticleSkeleton from "@/components/molecules/skeletons/CategoryArticleSkeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { rubik } from "@/config/fonts";
import { getArticlesByCategory } from "@/lib/api-client/article.api";
import { mapArticleToSummarized } from "@/lib/mapper/article.map";
import Link from "next/link";
import React from "react";
import { BsFillSkipForwardFill } from "react-icons/bs";
import useSWR from "swr";

export default function CategoryArticleSection() {
  const { data, isLoading } = useSWR("article-category", () =>
    getArticlesByCategory("3")
  );

  if (isLoading || !data) return <SkeletonSection />;

  return <DataSection data={data} />;
}

const SkeletonSection = () => {
  const fetchingData = Array.from({ length: 6 });

  return (
    <section className="space-y-4 mt-4 flex flex-col justify-center items-center">
      <h2 className={`${rubik.className} text-center text-3xl text-gray-500`}>
        <Skeleton />
      </h2>
      <Divider className="border-2 border-orange-400 w-1/6" />
      <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {fetchingData.map((_, index) => (
          <CategoryArticleSkeleton key={index} />
        ))}
      </div>
      <Button variant={"outline"} className="w-full">
        <BsFillSkipForwardFill />
      </Button>
    </section>
  );
};

const DataSection: React.FC<{ data: ArticleWithAuthorAndCategory[] }> = ({
  data,
}) => {
  const categoryArticle: ArticleSummary[] = data.map(mapArticleToSummarized);
  const categoryName = data[0].category_id.name;
  const categorySlug = data[0].category_id.slug;

  return (
    <section className="space-y-4 mt-4 flex flex-col justify-center items-center">
      <h2 className={`${rubik.className} text-center text-3xl text-gray-500`}>
        {categoryName}
      </h2>
      <Divider className="border-2 border-orange-400 w-1/6" />
      <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {categoryArticle.map((article, index) => (
          <Link key={index} href={`/articles/${article.slug}`}>
            <CategoryArticleCard articleSummary={article} key={index} />
          </Link>
        ))}
      </div>
      <Link href={`/category/${categorySlug}`} className="w-1/5 mt-4">
        <Button variant={"outline"} className="w-full">
          <BsFillSkipForwardFill />
        </Button>
      </Link>
    </section>
  );
};
