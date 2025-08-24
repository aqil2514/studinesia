import { ArticleSummary } from "@/@types/article";
import { baseSiteUrl } from "@/config/baseUrl";
import RSS from "rss";

export function generateRssFeed(posts: ArticleSummary[]) {
  const feed = new RSS({
    title: "Studinesia.online",
    description:
      "Segala sesuatu pasti ada ilmunya, untuk itulah Studinesia hadir!",
    generator: "RSS for Studinesia.online",
    feed_url: "https://studinesia.online/rss.xml",
    site_url: "https://studinesia.online",
    image_url: "https://studinesia.online/images/main-logo.png",
    docs: "https://validator.w3.org/feed/",
    managingEditor: "info@studinesia.io (Studinesia)",
    webMaster: "info@studinesia.io (Studinesia)",
    copyright: `© ${new Date().getFullYear()} Studinesia.io`,
    language: "id",
    categories: [
      "Teknologi",
      "Finansial",
      "Kesehatan",
      "Humaniora",
      "Islami",
      "Gaya Hidup",
    ],
    pubDate: new Date(),
    ttl: 60,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      date: new Date(post.published_at).toISOString(),
      description: post.description,
      url: `${baseSiteUrl}/articles/${post.slug}`,
    });
  });

  return feed.xml({ indent: true });
}
