import { serverEndpoint } from "@/config/serverEndpoint";
import axios from "axios";

export async function confirmNewsletter(token: string) {
  try {
    await axios.get(`${serverEndpoint}/newsletter/subscribe/confirm`, {
      params: {
        token,
      },
    });
  } catch (error) {
    console.error(`confirmNewsletter error`, error);
    throw error;
  }
}
