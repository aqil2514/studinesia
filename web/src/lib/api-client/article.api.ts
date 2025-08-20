import {
  ArticleHttpResponse,
  ArticleWithAuthorAndCategory,
} from "@/@types/article";
import axios from "axios";

const endpoint = "/api/articles";

export async function getPublishedArticles(page = 1, limit = 10) {
  try {
    const { data } = await axios.get<ArticleHttpResponse>(`${endpoint}`, {
      params: {
        mode: "published",
        page,
        limit,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getArticlesByCategory(category_id: string) {
  try {
    const { data } = await axios.get(`${endpoint}?category_id=${category_id}`);

    return data as ArticleWithAuthorAndCategory[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getNewestArticles() {
  try {
    const { data } = await axios.get(`${endpoint}`, {
      params: {
        mode: "newest",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
