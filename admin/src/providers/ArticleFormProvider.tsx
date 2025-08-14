"use client";
import { Author } from "@/@types/author";
import { Category } from "@/@types/category";
import React, { createContext, useContext } from "react";

interface ArticleFormContextState {
  authors: Author[];
  categories: Category[]
}

const ArticleFormContext = createContext<ArticleFormContextState>(
  {} as ArticleFormContextState
);

interface Props {
  authors: Author[];
  categories: Category[]
  children: React.ReactNode;
}

export default function ArticleFormProvider({ authors, children, categories }: Props) {
  const value: ArticleFormContextState = {
    authors,
    categories
  };

  return (
    <ArticleFormContext.Provider value={value}>
      {children}
    </ArticleFormContext.Provider>
  );
}

export const useArticleFormData = () => useContext(ArticleFormContext);
