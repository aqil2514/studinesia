import { Category } from "@/@types/article";
import axios from "axios";

interface GetCategoryQuery {
  limit?: number;
  slug?: string;
}

export async function getCategory(query?: GetCategoryQuery) {
  try {
    const { data } = await axios.get("/api/category", {
      params: query,
    });

    const resData = data.data as Category[];

    return resData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
