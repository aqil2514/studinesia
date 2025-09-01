"use client";

import useSWR from "swr";
import MainContainer from "../layouts/containers/MainContainer";
import Loading from "@/app/loading";
import TwoStepBreadcrumb from "../molecules/breadcrumbs/TwoStepBreadcrumb";
import { rubik } from "@/config/fonts";
import GridContainer from "../layouts/containers/GridContainer";
import Sidebar from "../layouts/Sidebar";
import { mapArticleToSummarized } from "@/lib/mapper/article.map";
import CategoryArticleCard from "../molecules/cards/CategoryArticleCard";
import Link from "next/link";
import { articleClientApi } from "@/lib/api-client/article.api";
import { QueryOptions } from "@/@types/supabase";

export default function CategorySlugTemplate({
  categoryId,
}: {
  categoryId: string;
}) {
  const { getArticles } = articleClientApi;
  const query: QueryOptions = {
    filters: [
      { key: "status", operator: "eq", value: "published" },
      { key: "category_id", operator: "eq", value: categoryId },
    ],
    sort: [{ key: "published_at", direction: "desc" }],
  };
  const { data, isLoading } = useSWR(`${categoryId}-category`, () =>
    getArticles(query)
  );

  if (!data || isLoading) return <Loading />;

  const categoryName = data.articles[0].category_id.name;
  const summarizedArticles = data.articles.map(mapArticleToSummarized);

  return (
    <MainContainer className="flex flex-col items-center justify-center md:block px-4 space-y-4 pt-4">
      <header className="space-y-8">
        <TwoStepBreadcrumb
          secondStepName="Kategori"
          secondStepLink="/category"
          currentStepName={categoryName}
        />
        <h1 className={`${rubik.className} font-bold text-2xl`}>
          Artikel Tentang {categoryName}
        </h1>
      </header>
      <GridContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {summarizedArticles.map((article) => (
            <Link key={article.title} href={`/articles/${article.slug}`}>
              <CategoryArticleCard articleSummary={article} />
            </Link>
          ))}
        </div>
        <Sidebar />
      </GridContainer>
    </MainContainer>
  );
}
