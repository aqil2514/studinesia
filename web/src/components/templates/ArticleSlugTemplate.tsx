"use client";
import { ArticleWithAuthorAndCategory } from "@/@types/article";
import MainContainer from "../layouts/containers/MainContainer";
import Sidebar from "../layouts/Sidebar";
import ArticleHeader from "../organisms/articles/ArticleHeader";
import ArticleMain from "../organisms/articles/ArticleMain";
import ArticleFooter from "../organisms/articles/ArticleFooter";
import ArticleJsonLd from "../organisms/articles/ArticleJsonLd";

interface Props {
  article: ArticleWithAuthorAndCategory;
}

export default function ArticleSlugTemplate({ article }: Props) {
  return (
    <>
      <ArticleJsonLd article={article} />
      <MainContainer className="grid grid-cols-1 md:grid-cols-[75%_auto] gap-4 pt-4 px-4">
        <div className="px-2 md:px-20 space-y-4">
          <ArticleHeader article={article} />

          <ArticleMain article={article} />

          <ArticleFooter article={article} />
        </div>

        <Sidebar />
      </MainContainer>
    </>
  );
}
