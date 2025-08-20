"use client";

import ArticleFormProvider from "@/providers/ArticleFormProvider";
import { Author } from "@/@types/author";
import { Category } from "@/@types/category";
import MainContainer from "@/components/layouts/Container/MainContainer";
import ArticleForm from "@/components/organisms/forms/articleForms";
import { ArticleSchemaType } from "@/schemas/article.schema";
import { ArticleWithAuthorAndCategory } from "@/@types/article";
import { putArticle } from "@/lib/client-api/article.api";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import Loading from "@/app/loading";

interface Props {
  authors: Author[];
  categories: Category[];
  article: ArticleSchemaType;
  dbArticle?: ArticleWithAuthorAndCategory;
}

export default function ArticleEditTemplate({
  authors,
  categories,
  article,
  dbArticle,
}: Props) {
  const isHydrated = useHasHydrated();

  if (!isHydrated) return <Loading />;

  return (
    <ArticleFormProvider
      authors={authors}
      categories={categories}
      article={dbArticle}
    >
      <MainContainer>
        <ArticleForm
          defaultValues={article}
          handler={(values) => putArticle(values)}
        />
      </MainContainer>
    </ArticleFormProvider>
  );
}
