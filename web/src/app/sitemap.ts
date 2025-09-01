import { QueryOptions } from "@/@types/supabase";
import { baseSiteUrl } from "@/config/baseUrl";
import { ArticleDBSelect } from "@/enums/article.enum";
import { articleServerApi } from "@/lib/api-server/article.api";
import { getAllCategory } from "@/lib/api-server/category.api";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { getArticles } = articleServerApi;

  const query: QueryOptions = {
    select: ArticleDBSelect.ARTICILE_WITH_RELATIONS,
    filters: [{ key: "status", operator: "eq", value: "published" }],
    sort: [{ key: "published_at", direction: "desc" }],
  };

  const { articles } = await getArticles(query);
  const categories = await getAllCategory();

  const staticUrl: MetadataRoute.Sitemap = [
    {
      url: baseSiteUrl,
      priority: 1,
      changeFrequency: "daily",
      lastModified: new Date(),
    },
    {
      url: `${baseSiteUrl}/category`,
      priority: 0.5,
      changeFrequency: "daily",
      lastModified: new Date(),
    },
    {
      url: `${baseSiteUrl}/articles`,
      priority: 0.5,
      changeFrequency: "daily",
      lastModified: new Date(),
    },
    {
      url: `${baseSiteUrl}/about`,
      priority: 0.5,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    // {
    //   url: `${baseSiteUrl}/kontak`,
    //   priority: 0.5,
    //   changeFrequency: "monthly",
    //   lastModified: new Date(),
    // },
  ];

  const categoryUrl: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseSiteUrl}/category/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: new Date(),
  }));

  const articleUrl: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseSiteUrl}/articles/${article.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
    images: article.url_to_image ? [article.url_to_image] : undefined,
    lastModified: new Date(article.published_at),
  }));

  return [...staticUrl, ...categoryUrl, ...articleUrl];
}
