import { ArticleWithAuthorAndCategory } from "@/@types/article";
import { baseSiteUrl } from "@/config/baseUrl";
import Script from "next/script";
import { Article, WithContext } from "schema-dts";

interface Props {
  article: ArticleWithAuthorAndCategory;
}

const getArticleJsonLd = (
  article: ArticleWithAuthorAndCategory
): WithContext<Article> => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  datePublished: article.published_at,
  dateModified: article.updated_at,
  url: `${baseSiteUrl}/articles/${article.slug}`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${baseSiteUrl}/articles/${article.slug}`,
  },
  author: {
    "@type": "Person",
    name: article.author_id.name,
  },
  image: article.url_to_image,
  publisher: {
    "@type": "Organization",
    name: "Studinesia",
    logo: {
      "@type": "ImageObject",
      url: `${baseSiteUrl}/images/logo.png`,
    },
  },
});

export default function ArticleJsonLd({ article }: Props) {
  const articleSchema = getArticleJsonLd(article);
  return (
    <Script
      id="article-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}
