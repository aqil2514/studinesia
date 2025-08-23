import { Article, ArticleWithAuthorAndCategory } from "@/@types/article";
import { ResponseWithData } from "@/@types/http-response";
import { serverEndpoint } from "@/config/serverEndpoint";
import axios from "axios";

export async function getAllArticles() {
  try {
    const { data } = await axios.get(`${serverEndpoint}/articles`);

    return data as Article[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPublishedArticles() {
  try {
    const { data } = await axios.get(`${serverEndpoint}/articles`, {
      params: {
        mode: "published",
      },
    });

    return data as Article[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const { data } = await axios.get(`${serverEndpoint}/articles/${slug}`);
    return data as ArticleWithAuthorAndCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getArticleByQuery(
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
