import ArticleAddTemplate from "@/components/templates/article/ArticleAddTemplate";
import { getAllAuthor } from "@/lib/api-server/author.api";
import { getAllCategory } from "@/lib/api-server/category.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tambah Artikel",
};

export default async function ArticleAddPage() {
  const [authors, categories] = await Promise.all([
    getAllAuthor(),
    getAllCategory(),
  ]);

  return <ArticleAddTemplate authors={authors} categories={categories} />;
}
