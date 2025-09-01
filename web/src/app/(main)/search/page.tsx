import { ArticleSummary } from "@/@types/article";
import SearchTemplate from "@/components/templates/SearchTemplate";
import { articleServerApi } from "@/lib/api-server/article.api";
import { mapArticleToSummarized } from "@/lib/mapper/article.map";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{ q: string }>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const query = (await searchParams).q;

  const siteName = "Studinesia";
  const baseTitle = "Cari Artikel";

  const title = query ? `Hasil pencarian untuk "${query}"` : `${baseTitle}`;

  const description = query
    ? `Temukan artikel terbaik yang membahas tentang "${query}" di ${siteName}.`
    : `Gunakan fitur pencarian untuk menemukan artikel menarik di ${siteName}.`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: "/search",
    },
    openGraph: {
      title,
      description,
      url: `/search?q=${query}`,
      siteName,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { getArticleByQuery } = articleServerApi;
  const { q } = await searchParams;
  const { data } = await getArticleByQuery(q);
  let articles: ArticleSummary[] = [];

  if (!data) {
    articles = [];
  } else {
    articles = data.map(mapArticleToSummarized);
  }

  return <SearchTemplate articles={articles} query={q} />;
}
