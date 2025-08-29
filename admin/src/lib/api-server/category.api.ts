import { Category } from "@/@types/category";
import { serverEndpoint } from "@/config/server-endpoint";
import axios from "axios";

export const getAllCategory = async () => {
  try {
    const { data } = await axios.get(`${serverEndpoint}/category`);

    return data as Category[]
  } catch (error) {
    console.error(error);
    throw error;
  }
}