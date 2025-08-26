import ArticleJsonLd from "@/components/organisms/pages/articles/ArticleJsonLd";
import ArticleSlugTemplate from "@/components/templates/ArticleSlugTemplate";
import { baseSiteUrl } from "@/config/baseUrl";
import { getPreviewArticleBySlug } from "@/lib/api-server/article.api";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPreviewArticleBySlug(slug);

  if (!article) {
    return {
      title: "Preview not found",
      description: "Artikel tidak ditemukan atau tidak bisa diakses",
    };
  }

  const imageUrl = article?.url_to_image;

  return {
    metadataBase: new URL(baseSiteUrl),
    title: `[PREVIEW] ${article?.title ?? "Article"}`,
    description: article?.meta_description ?? "Artikel Studinesia",
    robots: { follow: false, index: false },
    openGraph: {
      type: "article",
      locale: "id_ID",
      title: article?.title,
      description: article?.description,
      url: `${baseSiteUrl}/articles/preview/${article?.slug}`,
      images: imageUrl ? [imageUrl] : [],
      section: article.category_id?.name,
      authors: article?.author_id?.name ?? "Admin Studinesia",
      tags: article?.tags ?? [],
      siteName: "Studinesia",
      publishedTime: article?.published_at,
      modifiedTime: article?.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title,
      description: article?.description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ArticlePreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();

  if (!isEnabled) return notFound();
  
  const article = await getPreviewArticleBySlug(slug);

  if (!article) return notFound();

  return (
    <>
      <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-sm">
        🔍 Ini adalah tampilan preview. Artikel belum dipublish.
      </div>
      <ArticleJsonLd article={article} />
      <ArticleSlugTemplate article={article} />
    </>
  );
}
