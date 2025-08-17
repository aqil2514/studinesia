import { ArticleDB, ArticleTags } from "@/@types/article";
import { serverEndpoint } from "@/config/server-endpoint";
import axios from "axios";

export async function createNewArticle(payload: ArticleDB, token: string) {
  try {
    const { data } = await axios.post(`${serverEndpoint}/articles`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data as ArticleDB[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createNewArticleTags(payload: ArticleTags[], token:string) {
  try {
    await axios.post(`${serverEndpoint}/articles/article-tags`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
