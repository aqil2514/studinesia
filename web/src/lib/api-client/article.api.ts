import { ArticleWithAuthorAndCategory } from "@/@types/article";
import axios from "axios";

const endpoint = "/api/articles";

export async function getPublishedArticles() {
  try {
    const { data } = await axios.get(`${endpoint}?mode=published`);

    return data.articles as ArticleWithAuthorAndCategory[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getArticlesByCategory(category_id: string) {
  try {
    const { data } = await axios.get(`${endpoint}?category_id=${category_id}`);

    return data.articles as ArticleWithAuthorAndCategory[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
