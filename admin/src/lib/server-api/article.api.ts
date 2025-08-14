import { ArticleDB, ArticleTags } from "@/@types/article";
import { serverEndpoint } from "@/config/server-endpoint";
import axios from "axios";

export async function createNewArticle(payload: ArticleDB) {
  try {
    const { data } = await axios.post(`${serverEndpoint}/articles`, payload);

    return data.data as ArticleDB[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createNewArticleTags(payload: ArticleTags[]) {
  try {
    await axios.post(`${serverEndpoint}/articles/article-tags`, payload);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
