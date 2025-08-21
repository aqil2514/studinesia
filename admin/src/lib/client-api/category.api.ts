import { categoryChannel } from "@/components/templates/category/CategoryTemplate";
import { CategorySchemaType } from "@/schemas/category.schema";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

const endpoint = "/api/category";

export async function postCategory(data: CategorySchemaType) {
  try {
    await axios.post(endpoint, data);

    categoryChannel.postMessage({ type: "New_Category_Add" });
    categoryChannel.close();
    window.close();
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const data = error.response?.data;

      toast.error(data.message ?? "Terjadi kesalahan");
    }
  }
}
