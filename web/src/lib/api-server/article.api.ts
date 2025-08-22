import { ArticleWithAuthorAndCategory } from "@/@types/article";
import { ResponseWithData } from "@/@types/http-response";
import { serverEndpoint } from "@/config/serverEndpoint";
import axios from "axios";

export async function getPublishedArticles() {
  try {
    const { data } = await axios.get(`${serverEndpoint}/articles/published`);

    return data;
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
