import { ArticleWithAuthorAndCategory } from "@/@types/article";
import { baseSiteUrl } from "@/config/baseUrl";
import Head from "next/head";
import { Article } from "schema-dts";

interface Props {
  article: ArticleWithAuthorAndCategory;
}

const getArticleJsonLd = (article: ArticleWithAuthorAndCategory): Article => ({
  "@type": "Article",
  headline: article.title,
  datePublished: article.published_at,
  dateModified: article.updated_at,
  url: `${baseSiteUrl}/articles/${article.slug}`,
  author: {
    "@type": "Person",
    name: article.author_id.name,
  },
  image: article.url_to_image,
  publisher: {
    "@type": "Organization",
    name: "Studinesia",
    image: "https://www.studinesia.online/images/main-logo.png",
  },
});

export default function ArticleJsonLd({ article }: Props) {
  const articleSchema = getArticleJsonLd(article);
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </Head>
  );
}
