import {
  ArticleClientApi,
} from "@/@types/article";
import { QueryOptions } from "@/@types/supabase";
import axios from "axios";

const endpoint = "/api/articles";

export const articleClientApi: ArticleClientApi = {
  getArticles,
};

async function getArticles(query: QueryOptions) {
  try {
    const { data } = await axios.post(
      endpoint,
      query
    );

    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}