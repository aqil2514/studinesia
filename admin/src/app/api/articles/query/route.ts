import { ArticleWithRelationsResponse } from "@/@types/article";
import { QueryOptions } from "@/@types/query";
import { articleApiServer } from "@/lib/api-server/article.api";
import { NextRequest, NextResponse } from "next/server";

type ArticleQueryApiResponse = Promise<
  NextResponse<ResponseWithData<ArticleWithRelationsResponse>>
>;
export async function POST(req: NextRequest):ArticleQueryApiResponse {
  const { getArticles } = articleApiServer;
  const query: QueryOptions = await req.json();

  const data = await getArticles(query);

  const response:ResponseWithData<ArticleWithRelationsResponse> ={
    message:"Data artikel berhasil diambil",
    success: true,
    data
  }

  return NextResponse.json(response);
}
