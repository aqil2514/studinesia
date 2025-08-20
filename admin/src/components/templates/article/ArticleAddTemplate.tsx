"use client";

import ArticleFormProvider from "@/providers/ArticleFormProvider";
import { Author } from "@/@types/author";
import { Category } from "@/@types/category";
import { postArticle } from "@/lib/client-api/article.api";
import MainContainer from "@/components/layouts/Container/MainContainer";
import ArticleForm from "@/components/organisms/forms/articleForms";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import Loading from "@/app/loading";

interface Props {
  authors: Author[];
  categories: Category[];
}

export default function ArticleAddTemplate({ authors, categories }: Props) {
  const isHydrated = useHasHydrated();

  if(!isHydrated) return <Loading />
  return (
    <ArticleFormProvider authors={authors} categories={categories}>
      <MainContainer>
        <ArticleForm handler={(values) => postArticle(values)} />
      </MainContainer>
    </ArticleFormProvider>
  );
}
