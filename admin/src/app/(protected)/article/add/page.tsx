import ArticleAddTemplate from "@/components/templates/ArticleAddTemplate";
import { getAllAuthor } from "@/lib/server-api/author.api";
import { getAllCategory } from "@/lib/server-api/category.api";
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
