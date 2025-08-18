import { ArticleWithAuthorAndCategory } from "@/@types/article";
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
