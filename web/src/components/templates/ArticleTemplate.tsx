"use client";

import MainContainer from "../layouts/containers/MainContainer";
import ArticleCard from "../molecules/cards/ArticleCard";
import { rubik } from "@/config/fonts";
import Sidebar from "../layouts/Sidebar";
import { Button } from "../ui/button";
import useSWR from "swr";
import { getPublishedArticles } from "@/lib/api-client/article.api";
import { Article } from "@/@types/article";
import { mapArticleToSummarized } from "@/lib/mapper/article.map";

export default function ArticleTemplate() {
  const { data, error, isLoading } = useSWR("articles", getPublishedArticles);

  if (isLoading || !data) return null;

  const articles: Article[] = data.articles;
  const summarizedArticles = articles.map(mapArticleToSummarized)

  return (
    <MainContainer className="flex flex-col items-center justify-center md:block px-4 space-y-4 pt-4">
      <h1 className={`${rubik.className} font-bold text-2xl`}>Semua Artikel</h1>
      <div className="grid grid-cols-1 md:grid-cols-[75%_auto] gap-4">
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center">
          {summarizedArticles.map((article, index) => (
            <ArticleCard articleSummary={article} key={index} />
          ))}
          <Button
            variant={"outline"}
            className="w-full col-span-1 md:col-span-2 lg:col-span-3"
          >
            Muat Lagi
          </Button>
        </main>

        <Sidebar />
      </div>
    </MainContainer>
  );
}
