"use client";

import { rubik } from "@/config/fonts";
import MainContainer from "../layouts/containers/MainContainer";
import Sidebar from "../layouts/Sidebar";
import useSWR from "swr";
import { getCategory } from "@/lib/api-client/category.api";
import Loading from "@/app/loading";
import CategoryArticleSection from "../organisms/section/CategoryArticleSection";
import OneStepBreadcrumb from "../molecules/breadcrumbs/OneStepBreadcrumb";
import GridContainer from "../layouts/containers/GridContainer";

export default function CategoryTemplate() {
  const { data, isLoading } = useSWR("all-category", () => getCategory());

  if (!data || isLoading) return <Loading />;

  return (
    <MainContainer className="flex flex-col items-center justify-center md:block px-4 space-y-4 pt-4">
      <header>
        <OneStepBreadcrumb currentStepName="Kategori" />
        <h1 className={`${rubik.className} font-bold text-2xl`}>
          Semua Kategori Artikel
        </h1>
      </header>
      <GridContainer>
        <main className="w-full">
          {data.map((d) => {
            return (
              <CategoryArticleSection category_id={String(d.id)} key={d.id} />
            );
          })}
        </main>

        <Sidebar />
      </GridContainer>
    </MainContainer>
  );
}
