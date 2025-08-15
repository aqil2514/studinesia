import Loading from "@/app/loading";
import ArticleSlugTemplate from "@/components/templates/ArticleSlugTemplate";
import { getArticleBySlug } from "@/lib/api-server/article.api";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getArticleBySlug(slug);
  const article = articles[0];
  const baseUrl = "https://trixnews.com";
  // const tags = article?.categories.map((cat) => cat.title) ?? [];
  const imageUrl = article.url_to_image;

  return {
    metadataBase: new URL(baseUrl),
    title: article?.title ?? "Article",
    description: article?.meta_description ?? "Article of web3news",
    alternates: {
      canonical: `${baseUrl}/articles/${article?.slug}`,
    },
    openGraph: {
      type: "article",
      title: article?.title,
      description: article?.description,
      url: `${baseUrl}/articles/${article?.slug}`,
      images: [imageUrl],
      authors: article?.author_id?.name ?? "Admin Studinesia",
      // tags,
      siteName: "Trixnews",
      publishedTime: article?.published_at,
      modifiedTime: article?.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title,
      description: article?.description,
      images: [imageUrl],
    },
    creator: "Admin Trixnews",
    robots: { follow: true, index: true },
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

  return <ArticleSlugTemplate article={article[0]} />;
}
