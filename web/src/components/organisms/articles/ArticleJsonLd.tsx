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
  alternativeHeadline: article.meta_description,
  articleSection: article.category_id.name,
  keywords: article.tags.join(", "),
  datePublished: new Date(article.published_at).toISOString(),
  dateModified: new Date(article.updated_at).toISOString(),
  url: `${baseSiteUrl}/articles/${article.slug}`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${baseSiteUrl}/articles/${article.slug}`,
  },
  author: {
    "@type": "Person",
    name: article.author_id.name,
  },
  image: {
    "@type": "ImageObject",
    url: article.url_to_image,
    caption: article.image_caption,
  },
  publisher: {
    "@type": "Organization",
    name: "Studinesia",
    logo: {
      "@type": "ImageObject",
      url: `${baseSiteUrl}/images/logo.png`,
    },
  },
  timeRequired: `PT${article.reading_time}M`,
  articleBody: article.content.replace(/<[^>]+>/g, ""),
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
