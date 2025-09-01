import { QueryOptions } from "@/@types/supabase";
import { ArticleDBSelect } from "@/enums/article.enum";
import { articleServerApi } from "@/lib/api-server/article.api";
import { mapArticleToSummarized } from "@/lib/mapper/article.map";
import { generateRssFeed } from "@/lib/rss";
import { NextResponse } from "next/server";

export async function GET() {
  const { getArticles } = articleServerApi;

  const query: QueryOptions = {
    select: ArticleDBSelect.ARTICILE_WITH_RELATIONS,
    filters: [{ key: "status", operator: "eq", value: "published" }],
    sort: [{ key: "published_at", direction: "desc" }],
  };

  const data = await getArticles(query);
  const summarized = data.articles.map(mapArticleToSummarized);
  const feed = generateRssFeed(summarized);

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
