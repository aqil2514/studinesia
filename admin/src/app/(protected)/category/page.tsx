import CategoryTemplate from "@/components/templates/category/CategoryTemplate";
import { getAllCategory } from "@/lib/server-api/category.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kategori",
};

export default async function CategoryPage() {
  const categories = await getAllCategory();
  return <CategoryTemplate categories={categories} />;
}
