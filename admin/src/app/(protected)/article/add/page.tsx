import ArticleAddTemplate from "@/components/templates/ArticleAddTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tambah Artikel",
};

export default function ArticleAddPage() {
  return <ArticleAddTemplate />;
}
