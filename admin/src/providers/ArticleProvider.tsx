import { ArticleSummary } from "@/@types/article";
import { getArticles } from "@/lib/client-api/article.api";
import { articleMapper } from "@/lib/mappers/article.mapper";
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface ArticleContextType {
  initArticles: ArticleSummary[];
  articles: ArticleSummary[];
  setArticles: React.Dispatch<React.SetStateAction<ArticleSummary[]>>;
  isRefreshing: boolean;
  setIsRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
  refreshHandler: () => Promise<void>;
}

const ArticleContext = createContext<ArticleContextType>(
  {} as ArticleContextType
);

interface ArticleProviderProps {
  initArticles: ArticleSummary[];
  children: React.ReactNode;
}

export default function ArticleProvider({
  initArticles,
  children,
}: ArticleProviderProps) {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleSummary[]>(initArticles);

  const refreshHandler = async () => {
    try {
      setIsRefreshing(true);
      const refreshedData = await getArticles({ type: "full" });
      const mappedData = refreshedData.map(
        articleMapper.mapArticleDbToSummarizedArticle
      );

      setArticles(mappedData);
      toast.success("Artikel berhasil direfresh");
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsRefreshing(false);
    }
  };

  const value: ArticleContextType = {
    initArticles,
    isRefreshing,
    setIsRefreshing,
    refreshHandler,
    articles,
    setArticles,
  };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
}

export const useArticleData = () => useContext(ArticleContext);
