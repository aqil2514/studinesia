"use client";

import MainContainer from "../layouts/containers/MainContainer";
import ArticleCard from "../molecules/cards/ArticleCard";
import { rubik } from "@/config/fonts";
import Sidebar from "../layouts/Sidebar";
import { Button } from "../ui/button";
import useSWR from "swr";
import { mapArticleToSummarized } from "@/lib/mapper/article.map";
import Loading from "@/app/loading";
import GridContainer from "../layouts/containers/GridContainer";
import OneStepBreadcrumb from "../molecules/breadcrumbs/OneStepBreadcrumb";
import { useEffect, useState } from "react";
import { ArticleSummary } from "@/@types/article";
import { articleClientApi } from "@/lib/api-client/article.api";
import { QueryOptions } from "@/@types/supabase";
import { ArticleDBSelect } from "@/enums/article.enum";

export default function ArticleTemplate() {
  const { getArticles } = articleClientApi;
  const [page, setPage] = useState<number>(1);
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const query: QueryOptions = {
    filters: [{ key: "status", operator: "eq", value: "published" }],
    limit: 6,
    page,
    select: ArticleDBSelect.ARTICILE_WITH_RELATIONS,
    sort: [{ key: "published_at", direction: "desc" }],
  };

  const { data, isLoading } = useSWR(["articles", page], () =>
    getArticles(query)
  );

  useEffect(() => {
    if (data?.articles) {
      const newArticles = data.articles.map(mapArticleToSummarized);
      setArticles((prev) => [...prev, ...newArticles]);
    }
  }, [data]);

  const isFirstPage = page === 1;

  if (isLoading && isFirstPage) return <Loading />;

  const loadHandler = () => setPage(page + 1);

  return (
    <MainContainer className="flex flex-col items-center justify-center md:block px-4 space-y-4 pt-4">
      <header>
        <OneStepBreadcrumb currentStepName="Artikel" />
        <h1 className={`${rubik.className} font-bold text-2xl`}>
          Semua Artikel
        </h1>
      </header>
      <GridContainer>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {articles.map((article, index) => (
            <ArticleCard articleSummary={article} key={index} />
          ))}
          <Button
            variant={"outline"}
            className="w-full col-span-1 md:col-span-2 lg:col-span-3"
            onClick={loadHandler}
            disabled={!data?.hasNext || isLoading}
          >
            {isLoading && !isFirstPage ? "Memuat..." : "Muat Lagi"}
          </Button>
        </main>

        <Sidebar />
      </GridContainer>
    </MainContainer>
  );
}
