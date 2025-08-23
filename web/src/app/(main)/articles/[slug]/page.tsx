import Loading from "@/app/loading";
import ArticleJsonLd from "@/components/organisms/articles/ArticleJsonLd";
import ArticleSlugTemplate from "@/components/templates/ArticleSlugTemplate";
import { baseSiteUrl } from "@/config/baseUrl";
import { getArticleBySlug } from "@/lib/api-server/article.api";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const imageUrl = article.url_to_image;

  return {
    metadataBase: new URL(baseSiteUrl),
    title: article?.title ?? "Article",
    description: article?.meta_description ?? "Artikel Studinesia",
    creator: "Admin Studinesia",
    robots: { follow: true, index: true },
    alternates: {
      canonical: `${baseSiteUrl}/articles/${article?.slug}`,
    },
    openGraph: {
      type: "article",
      title: article?.title,
      description: article?.description,
      url: `${baseSiteUrl}/articles/${article?.slug}`,
      images: [imageUrl],
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
  };
}

export default async function ArticleSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return <Loading />;
  }

  return (
    <>
      <ArticleJsonLd article={article} />
      <ArticleSlugTemplate article={article} />
    </>
  );
}
