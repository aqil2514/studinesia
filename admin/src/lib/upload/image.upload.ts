import { serverEndpoint } from "@/config/server-endpoint";
import axios from "axios";

export async function uploadImage(image: File, folder: string, token: string) {
  const formData: FormData = new FormData();
  formData.append("image", image);

  try {
    const { data } = await axios.postForm(
      `${serverEndpoint}/upload/image?folder=${encodeURIComponent(folder)}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.url as string;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
