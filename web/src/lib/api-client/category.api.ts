import { Category } from "@/@types/article";
import axios from "axios";

export async function getCategory() {
  try {
    const { data } = await axios.get("/api/category");

    const resData = data.data as Category[];

    return resData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCategoryAndLimit(limit: number) {
  try {
    const { data } = await axios.get("/api/category", {
      params: {
        limit,
      },
    });

    const resData = data.data as Category[];

    return resData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
