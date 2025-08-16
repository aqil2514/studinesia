import { Category } from "@/@types/article";
import { serverEndpoint } from "@/config/serverEndpoint";
import axios from "axios";

export async function getCategoryBySlug(slug: string) {
  try {
    const { data } = await axios.get(`${serverEndpoint}/category`, {
      params: {
        slug,
      },
    });

    return data as Category[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
