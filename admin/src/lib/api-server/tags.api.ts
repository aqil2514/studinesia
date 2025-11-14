import { Tag } from "@/@types/tags";
import { serverEndpoint } from "@/config/server-endpoint";
import { generateSlug } from "@/utils/generateSlug";
import axios from "axios";

export async function createBulksNewTags(raw: string[], token: string) {
  const tagsData: Tag[] = raw.map((r) => ({
    name: r,
    slug: generateSlug(r),
  }));
  try {
    const { data } = await axios.post(
      `${serverEndpoint}/tags/bulks`,
      tagsData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.tags as Tag[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createN8NBulksNewTags(raw: string[]) {
  const tagsData: Tag[] = raw.map((r) => ({
    name: r,
    slug: generateSlug(r),
  }));
  try {
    const { data } = await axios.post(`${serverEndpoint}/tags/bulks/n8n`, tagsData);

    return data.tags as Tag[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTags() {
  try {
    const { data } = await axios.get<ResponseWithData<Tag[]>>(
      `${serverEndpoint}/tags`
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
