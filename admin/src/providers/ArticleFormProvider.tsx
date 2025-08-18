"use client";
import { ArticleWithAuthorAndCategory } from "@/@types/article";
import { Author } from "@/@types/author";
import { Category } from "@/@types/category";
import React, { createContext, useContext } from "react";

interface ArticleFormContextState {
  authors: Author[];
  categories: Category[];
  article?: ArticleWithAuthorAndCategory;
}

const ArticleFormContext = createContext<ArticleFormContextState>(
  {} as ArticleFormContextState
);

interface Props {
  authors: Author[];
  categories: Category[];
  article?: ArticleWithAuthorAndCategory;
  children: React.ReactNode;
}

export default function ArticleFormProvider({
  authors,
  children,
  categories,
  article,
}: Props) {
  const value: ArticleFormContextState = {
    authors,
    categories,
    article,
  };

  return (
    <ArticleFormContext.Provider value={value}>
      {children}
    </ArticleFormContext.Provider>
  );
}

export const useArticleFormData = () => useContext(ArticleFormContext);
