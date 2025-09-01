import ArticleJsonLd from "@/components/organisms/pages/articles/ArticleJsonLd";
import ArticleSlugTemplate from "@/components/templates/ArticleSlugTemplate";
import { baseSiteUrl } from "@/config/baseUrl";
import { articleServerApi } from "@/lib/api-server/article.api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const {getArticleBySlug} = articleServerApi;
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const imageUrl = article.url_to_image;

  return {
    metadataBase: new URL(baseSiteUrl),
    title: article?.title ?? "Article",
    description: article?.meta_description ?? "Artikel Studinesia",
    creator: "Admin Studinesia",
    robots: { follow: true, index: true },
    keywords: article.tags,
    alternates: {
      canonical: `${baseSiteUrl}/articles/${article?.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "id_ID",
      title: article?.title,
      description: article?.description,
      url: `${baseSiteUrl}/articles/${article?.slug}`,
      images: [imageUrl],
      section: article.category_id.name,
      authors: article?.author_id?.name ?? "Admin Studinesia",
      tags: article.tags ?? [],
      siteName: "Studinesia",
      publishedTime: article?.published_at,
      modifiedTime: article?.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title,
      description: article?.description,
      images: [imageUrl],
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function ArticleSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const {getArticleBySlug} = articleServerApi;

  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return notFound();

  return (
    <>
      <ArticleJsonLd article={article} />
      <ArticleSlugTemplate article={article} />
    </>
  );
}
