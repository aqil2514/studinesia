import { Tag } from "@/@types/tags";
import { serverEndpoint } from "@/config/server-endpoint";
import { generateSlug } from "@/utils/generateSlug";
import axios from "axios";

export async function createBulksNewTags(raw: string[]) {
  const tagsData: Tag[] = raw.map((r) => ({
    name: r,
    slug: generateSlug(r),
  }));
  try {
    const { data } = await axios.post(`${serverEndpoint}/tags/bulks`, tagsData);

    return data.tags as Tag[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
