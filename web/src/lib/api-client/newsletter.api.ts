import { BasicResponse } from "@/@types/http-response";
import axios, { isAxiosError } from "axios";

export async function subscribe(
  name: string,
  email: string
): Promise<BasicResponse> {
  try {
    const { data } = await axios.post<BasicResponse>(
      "/api/newsletter/subscribe",
      {
        name,
        email,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const data: BasicResponse = error.response?.data;

      return data;
    }

    return {
      message: "Terjadi kesalahan",
      success: false,
    };
  }
}
