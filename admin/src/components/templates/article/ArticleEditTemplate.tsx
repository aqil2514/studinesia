"use client";

import ArticleFormProvider from "@/providers/ArticleFormProvider";
import { Author } from "@/@types/author";
import { Category } from "@/@types/category";
import MainContainer from "@/components/layouts/Container/MainContainer";
import ArticleForm from "@/components/organisms/forms/articleForms";
import { ArticleSchemaType } from "@/schemas/article.schema";
import { ArticleWithAuthorAndCategory } from "@/@types/article";

interface Props {
  authors: Author[];
  categories: Category[];
  article : ArticleSchemaType;
  dbArticle?: ArticleWithAuthorAndCategory;
}

export default function ArticleEditTemplate({ authors, categories, article, dbArticle }: Props) {
  return (
    <ArticleFormProvider authors={authors} categories={categories} article={dbArticle}>
      <MainContainer>
        <ArticleForm defaultValues={article} handler={(values) => console.log(values)} />
      </MainContainer>
    </ArticleFormProvider>
  );
}
