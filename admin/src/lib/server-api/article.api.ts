import {
  ArticleDB,
  ArticleStatus,
  ArticleTags,
  ArticleWithAuthorAndCategory,
  GetArticlesParams,
} from "@/@types/article";
import { auth } from "@/auth";
import { serverEndpoint } from "@/config/server-endpoint";
import axios from "axios";

export async function getArticles(params?: GetArticlesParams) {
  try {
    const { data } = await axios.get<ArticleWithAuthorAndCategory[]>(
      `${serverEndpoint}/articles`,
      {
        params,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<ResponseWithData<ArticleWithAuthorAndCategory>> {
  const session = await auth();
  try {
    const { data } = await axios.get(
      `${serverEndpoint}/articles/${slug}/admin`,
      {
        headers: {
          Authorization: `Bearer ${session?.supabaseAccessToken}`,
        },
      }
    );

    return {
      message: "Ambil artikel berhasil",
      data: data as ArticleWithAuthorAndCategory,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: `Ambil artikel gagal`,
      success: false,
    };
  }
}

export async function createNewArticle(payload: ArticleDB, token: string) {
  try {
    const { data } = await axios.post(`${serverEndpoint}/articles`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data as ArticleDB[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateArticle(payload: ArticleDB, token: string) {
  try {
    const { data } = await axios.put(`${serverEndpoint}/articles`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data as ArticleDB[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createNewArticleTags(
  payload: ArticleTags[],
  token: string
) {
  try {
    await axios.post(`${serverEndpoint}/articles/article-tags`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function putArticleTags(payload: ArticleTags[], token: string) {
  try {
    await axios.put(`${serverEndpoint}/articles/article-tags`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function patchArticleStatus(
  slug: string,
  status: ArticleStatus,
  token: string
) {
  try {
    await axios.patch(
      `${serverEndpoint}/articles/${slug}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function softDeleteArticle(slug: string, token: string) {
  try {
    await axios.patch(
      `${serverEndpoint}/articles/${slug}/soft-delete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
