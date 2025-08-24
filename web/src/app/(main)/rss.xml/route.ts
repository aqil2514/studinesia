import { getPublishedArticles } from "@/lib/api-server/article.api";
import { mapArticleToSummarized } from "@/lib/mapper/article.map";
import { generateRssFeed } from "@/lib/rss";
import { NextResponse } from "next/server";

export async function GET() {
  const articles = await getPublishedArticles();
  const summarized = articles.map(mapArticleToSummarized);
  const feed = generateRssFeed(summarized);

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
