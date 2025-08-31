import { ArticleSummary } from "@/@types/article";
import { Category } from "@/@types/category";
import { QueryOptions } from "@/@types/query";
import { FilterState } from "@/components/molecules/filter/interface";
import { articleApiClient } from "@/lib/api-client/article.api";
import { articleMapper } from "@/lib/mappers/article.mapper";
import { useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface ArticleContextType {
  initArticles: ArticleSummary[];
  initCount: number;
  categories: Category[];
  articles: ArticleSummary[];
  setArticles: React.Dispatch<React.SetStateAction<ArticleSummary[]>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  isRefreshing: boolean;
  setIsRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
  refreshHandler: () => Promise<void>;
  filters: FilterState[];
  setFilters: (filters: FilterState[]) => void;
}

const ArticleContext = createContext<ArticleContextType>(
  {} as ArticleContextType
);

interface ArticleProviderProps {
  initArticles: ArticleSummary[];
  children: React.ReactNode;
  categories: Category[];
  initCount: number;
}

// export default function ArticleProvider({
//   initArticles,
//   children,
//   count,
// }: ArticleProviderProps) {
//   const { getArticlesWithRelations } = articleApiClient;
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
//   const [articles, setArticles] = useState<ArticleSummary[]>(initArticles);
//   const [filters, setFilters] = useState<FilterState[]>([]);
//   const searchParams = useSearchParams();

//   const limit = Number(searchParams.get("limit"));
//   const page = Number(searchParams.get("page"));

//   useEffect(() => {
//     setArticles(initArticles);
//   }, [initArticles]);

//   const refreshHandler = async () => {
//     try {
//       setIsRefreshing(true);
//       const { data, success } = await getArticlesWithRelations({
//         type: "full",
//         limit,
//         page,
//       });

//       if (!data || !success)
//         throw new Error("Terjadi kesalahan saat refresh artikel");
//       const mappedData = data.articles.map(
//         articleMapper.mapArticleDbToSummarizedArticle
//       );

//       setArticles(mappedData);
//       toast.success("Artikel berhasil direfresh");
//     } catch (error) {
//       console.error(error);
//       throw error;
//     } finally {
//       setIsRefreshing(false);
//     }
//   };

//   const value: ArticleContextType = {
//     initArticles,
//     isRefreshing,
//     setIsRefreshing,
//     refreshHandler,
//     articles,
//     setArticles,
//     count,
//     filters,
//     setFilters,
//   };

//   return (
//     <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
//   );
// }

export default function ArticleProvider({
  initArticles,
  children,
  initCount,
  categories,
}: ArticleProviderProps) {
  const { getArticles } = articleApiClient;
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleSummary[]>(initArticles);
  const [count, setCount] = useState<number>(initCount);
  const [filters, setFilters] = useState<FilterState[]>([]);
  const searchParams = useSearchParams();

  const limit = Number(searchParams.get("limit"));
  const page = Number(searchParams.get("page"));

  // Kalo artikel dan jumlahnya berubah dari luar, ikutin itu
  useEffect(() => {
    setArticles(initArticles);
    setCount(initCount);
  }, [initArticles, initCount]);

  const refreshHandler = async () => {
    const query: QueryOptions = {
      page,
      limit,
      filters,
      select: "*, author_id(name, id), category_id(id, name, slug)",
      sort: [{ key: "published_at", direction: "desc" }],
    };
    try {
      setIsRefreshing(true);
      const { data, success } = await getArticles(query);

      if (!data || !success)
        throw new Error("Terjadi kesalahan saat refresh artikel");
      const mappedData = data.articles.map(
        articleMapper.mapArticleDbToSummarizedArticle
      );

      setArticles(mappedData);
      setCount(data.count ?? initCount);
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
    filters,
    setFilters,
    initCount,
    setCount,
    categories,
  };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
}

export const useArticleData = () => useContext(ArticleContext);
