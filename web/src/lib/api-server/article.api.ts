import {
  ArticleServerApi,
  ArticleWithAuthorAndCategory,
  ArticleWithRelationsResponse,
} from "@/@types/article";
import { ResponseWithData } from "@/@types/http-response";
import { QueryOptions } from "@/@types/supabase";
import { serverEndpoint } from "@/config/serverEndpoint";
import axios from "axios";

export const articleServerApi: ArticleServerApi = {
  getArticles,
  getArticleBySlug,
  getPreviewArticleBySlug,
  getArticleByQuery
};

async function getArticles(query: QueryOptions) {
  try {
    const { data } = await axios.post<ArticleWithRelationsResponse>(
      `${serverEndpoint}/articles/query`,
      query
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getArticleBySlug(slug: string) {
  try {
    const { data } = await axios.get(`${serverEndpoint}/articles/${slug}`);
    return data as ArticleWithAuthorAndCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getPreviewArticleBySlug(slug: string) {
  try {
    const { data } = await axios.get(
      `${serverEndpoint}/articles/${slug}/preview`
    );
    return data as ArticleWithAuthorAndCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getArticleByQuery(
  query: string
): Promise<ResponseWithData<ArticleWithAuthorAndCategory[]>> {
  try {
    const { data } = await axios.get<
      ResponseWithData<ArticleWithAuthorAndCategory[]>
    >(`${serverEndpoint}/articles/query`, {
      params: {
        query,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
