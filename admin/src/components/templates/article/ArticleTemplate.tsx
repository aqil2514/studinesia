"use client";

import { useEffect } from "react";
import MainContainer from "../../layouts/Container/MainContainer";
import { toast } from "sonner";
import PageHeaderWithActions from "../../organisms/header/PageHeaderWithActions";
import { ArticleSummary } from "@/@types/article";
import { BasicTable } from "../../organisms/data-tables/BasicTable";
import { articleColumns } from "../../organisms/columns/articleColumns";
import TableFooter from "@/components/organisms/footer/TableFooter";
import ArticleProvider, { useArticleData } from "@/providers/ArticleProvider";
import { Category } from "@/@types/category";
import FilterData from "@/components/featured/articles/FilterData";

export const articleChannel = new BroadcastChannel("article_channel");
interface Props {
  articles: ArticleSummary[];
  count: number;
  categories: Category[];
}

export default function ArticleTemplate({
  articles,
  count,
  categories,
}: Props) {
  useEffect(() => {
    articleChannel.onmessage = (event) => {
      if (event.data?.type === "New_Article_Add") {
        toast.success("Tambah artikel berhasil");
      } else if (event.data?.type === "Article_Edited") {
        toast.success("Edit artikel berhasil");
      }
    };

    return () => articleChannel.close();
  }, []);

  return (
    <ArticleProvider
      initArticles={articles}
      initCount={count}
      categories={categories}
    >
      <InnerTemplate />
    </ArticleProvider>
  );
}

const InnerTemplate = () => {
  const { articles, isRefreshing, refreshHandler, count } = useArticleData();
  return (
    <MainContainer className="space-y-4">
      <PageHeaderWithActions
        title="Artikel"
        subtitle="Atur dan kelola artikel"
        addHref="/article/add"
        addLabel="Tambah Artikel"
        openOnBlank
      />

      {/* Controllers */}
      <div className="flex gap-4">
        <FilterData />
      </div>

      <BasicTable columns={articleColumns} data={articles} />
      <TableFooter
        dataCount={count}
        isRefreshing={isRefreshing}
        refreshHandler={refreshHandler}
        label="Artikel"
      />
    </MainContainer>
  );
};
