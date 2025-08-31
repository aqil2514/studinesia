import { ArticleSchemaType } from "@/schemas/article.schema";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { articleChannel } from "@/components/templates/article/ArticleTemplate";
import {
  ArticleApiClient,
  ArticleStatus,
  ArticleWithAuthorAndCategory,
  ArticleWithRelationsResponse,
  GetArticlesParams,
} from "@/@types/article";
import { articleMapper } from "../mappers/article.mapper";
import { QueryOptions } from "@/@types/query";

const endpoint = "/api/articles";

const { mapArticleDataToFormData } = articleMapper;

export const articleApiClient: ArticleApiClient = {
  getArticlesWithRelations,
  // TODO : Next buat ini
  getArticles: getArticlesNew,
};

async function getArticlesNew(
  query: QueryOptions
): Promise<ResponseWithData<ArticleWithRelationsResponse>> {
  try {
    const { data } = await axios.post<
      ResponseWithData<ArticleWithRelationsResponse>
    >(`${endpoint}/query`, query);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getArticlesWithRelations(
  params?: GetArticlesParams
): Promise<ResponseWithData<ArticleWithRelationsResponse>> {
  try {
    const { data } = await axios.get(`${endpoint}`, {
      params,
    });

    return {
      data: data.data,
      message: data.message,
      success: data.success,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getArticles(params?: GetArticlesParams) {
  try {
    const { data } = await axios.get(`/api/articles`, {
      params,
    });

    return data.data as ArticleWithAuthorAndCategory[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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

export async function putArticle(data: ArticleSchemaType) {
  const formData = mapArticleDataToFormData(data);

  try {
    await axios.putForm(endpoint, formData);

    articleChannel.postMessage({ type: "Article_Edited" });
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

export async function patchArticleStatus(
  status: ArticleStatus,
  slug: string
): Promise<BasicResponse> {
  try {
    await axios.patch(
      endpoint,
      { status, slug },
      {
        params: {
          patch: "status",
        },
      }
    );

    return {
      success: true,
      message: "Status artikel berhasil diganti",
    };
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const data = error.response?.data;

      return {
        message: data.message ?? "Terjadi kesalahan",
        success: false,
      };
    }
    return {
      message: "Terjadi kesalahan",
      success: false,
    };
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
