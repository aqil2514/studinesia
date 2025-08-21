import { Tag } from "@/@types/tags";
import { tagsChannel } from "@/components/templates/tags/TagsTemplate";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

const endpoint = "/api/tags";

export async function postTags(formData: Tag) {
  try {
    await axios.post(endpoint, formData);

    tagsChannel.postMessage({ type: "New_Tags" });
    tagsChannel.close();
    window.close();
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const data = error.response?.data;

      toast.error(data.message ?? "Terjadi kesalahan saat menambahkan data");
    }
  }
}