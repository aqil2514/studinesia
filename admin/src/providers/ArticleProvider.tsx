import { ArticleSummary } from "@/@types/article";
import { articleApiClient } from "@/lib/api-client/article.api";
import { articleMapper } from "@/lib/mappers/article.mapper";
import { useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface ArticleContextType {
  initArticles: ArticleSummary[];
  articles: ArticleSummary[];
  setArticles: React.Dispatch<React.SetStateAction<ArticleSummary[]>>;
  isRefreshing: boolean;
  setIsRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
  refreshHandler: () => Promise<void>;
  count: number;
}

const ArticleContext = createContext<ArticleContextType>(
  {} as ArticleContextType
);

interface ArticleProviderProps {
  initArticles: ArticleSummary[];
  children: React.ReactNode;
  count: number;
}

const { getArticlesWithRelations } = articleApiClient;

export default function ArticleProvider({
  initArticles,
  children,
  count,
}: ArticleProviderProps) {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleSummary[]>(initArticles);
  const searchParams = useSearchParams();

  const limit = Number(searchParams.get("limit"));
  const page = Number(searchParams.get("page"));

  useEffect(() => {
    setArticles(initArticles)
  }, [initArticles])

  const refreshHandler = async () => {
    try {
      setIsRefreshing(true);
      const { data, success } = await getArticlesWithRelations({
        type: "full",
        limit,
        page
      });

      if (!data || !success)
        throw new Error("Terjadi kesalahan saat refresh artikel");
      const mappedData = data.articles.map(
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
    count,
  };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
}

export const useArticleData = () => useContext(ArticleContext);
