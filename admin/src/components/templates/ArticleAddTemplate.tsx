"use client";

import ArticleFormProvider from "@/providers/ArticleFormProvider";
import MainContainer from "../layouts/Container/MainContainer";
import ArticleForm from "../organisms/forms/articleForms";
import { Author } from "@/@types/author";
import { Category } from "@/@types/category";
import { postArticle } from "@/lib/client-api/article.api";

interface Props {
  authors: Author[];
  categories: Category[];
}

export default function ArticleAddTemplate({ authors, categories }: Props) {
  return (
    <ArticleFormProvider authors={authors} categories={categories}>
      <MainContainer>
        <ArticleForm handler={(values) => postArticle(values)} />
      </MainContainer>
    </ArticleFormProvider>
  );
}
