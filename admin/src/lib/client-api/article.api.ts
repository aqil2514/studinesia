import { ArticleSchemaType } from "@/schemas/article.schema";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { mapArticleDataToFormData } from "../mappers/article.mapper";
import { articleChannel } from "@/components/templates/ArticleTemplate";

const endpoint = "/api/articles";

export async function postArticle(data: ArticleSchemaType) {
  const formData = mapArticleDataToFormData(data)

  try {
    await axios.postForm(endpoint, formData);

    articleChannel.postMessage({ type: "New_Article_Add" });
    articleChannel.close();
    window.close();
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const data = error.response?.data;

      toast.error(data.message ?? "Terjadi kesalahan");
    }
  }
}
