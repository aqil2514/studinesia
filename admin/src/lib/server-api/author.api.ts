import { Author } from "@/@types/author";
import { serverEndpoint } from "@/config/server-endpoint";
import axios from "axios";

export const getAllAuthor = async () => {
  try {
    const { data } = await axios.get(`${serverEndpoint}/author`);

    return data as Author[]
  } catch (error) {
    console.error(error);
    throw error;
  }
}