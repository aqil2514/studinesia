import { User } from "@/@types/user";
import { serverEndpoint } from "@/config/server-endpoint";
import axios from "axios";

export async function getUserByUserId(user_id: string) {
  try {
    const { data } = await axios.get(`${serverEndpoint}/user`, {
      params: {
        user_id,
      },
    });

    return data as User;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
