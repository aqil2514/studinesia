import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel",
};

export default function ArticlePage() {
  return <ArticleTemplate />;
}
