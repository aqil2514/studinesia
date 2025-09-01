import { ArticleWithRelationsResponse } from "@/@types/article";
import { QueryOptions } from "@/@types/supabase";
import { serverEndpoint } from "@/config/serverEndpoint";
import { articleServerApi } from "@/lib/api-server/article.api";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const mode = searchParams.get("mode");
  const category_id = searchParams.get("category_id");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  try {
    const { data } = await axios.get<ArticleWithRelationsResponse>(
      `${serverEndpoint}/articles`,
      {
        params: {
          mode,
          category_id,
          page,
          limit,
        },
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  const { getArticles } = articleServerApi;
  const query: QueryOptions = await req.json();

  const data = await getArticles(query);

  return NextResponse.json({ data });
}
