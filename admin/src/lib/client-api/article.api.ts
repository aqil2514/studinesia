import { ArticleSchemaType } from "@/schemas/article.schema";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { mapArticleDataToFormData } from "../mappers/article.mapper";
import { articleChannel } from "@/components/templates/article/ArticleTemplate";

const endpoint = "/api/articles";

export async function postArticle(data: ArticleSchemaType) {
  const formData = mapArticleDataToFormData(data);

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

export async function softDeleteArticle(
  slug: string,
  setIsLoading: (state: boolean) => void
): Promise<BasicResponse> {
  try {
    setIsLoading(true);
    const { data } = await axios.delete(endpoint, {
      params: {
        slug,
      },
    });

    return { success: true, message: data.message };
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const data = error.response?.data;

      toast.error(data.message ?? "Terjadi kesalahan");
      return { success: false, message: data.message ?? "Terjadi kesalahan" };
    }
    return { success: false, message: "Terjadi kesalahan" };
  } finally {
    setIsLoading(false);
  }
}
