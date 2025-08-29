import ArticleEditTemplate from "@/components/templates/article/ArticleEditTemplate";
import { articleMapper } from "@/lib/mappers/article.mapper";
import { getArticleBySlug } from "@/lib/api-server/article.api";
import { getAllAuthor } from "@/lib/api-server/author.api";
import { getAllCategory } from "@/lib/api-server/category.api";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const articles = await getArticleBySlug(slug);
  if (!articles.success || !articles.data)
    return {
      title: "Edit Artikel",
    };
  const article = articles.data;

  return { title: `Edit ${article.title ?? "Artikel"}` };
}

export default async function EditArticlePage({ params }: Props) {
  const { slug } = await params;
  const [authors, categories, raw] = await Promise.all([
    getAllAuthor(),
    getAllCategory(),
    getArticleBySlug(slug),
  ]);
  const { mapArticleDBToForm } = articleMapper;

  const article = mapArticleDBToForm(raw.data!);
  return (
    <ArticleEditTemplate
      article={article}
      authors={authors}
      categories={categories}
      dbArticle={raw.data}
    />
  );
}
