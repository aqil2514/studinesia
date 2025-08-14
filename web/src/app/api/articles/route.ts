import { ArticleFetchMode } from "@/@types/article";
import { getPublishedArticles } from "@/lib/api-server/article.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const modeParams = searchParams.get("mode");
  if (!modeParams) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }
  const mode = modeParams as ArticleFetchMode;

  if (mode === "published") {
    const data = await getPublishedArticles();

    return NextResponse.json({ articles: data });
  }
}
