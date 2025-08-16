import CategoryTemplate from "@/components/templates/CategoryTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kategori",
  description: "Telusuri artikel dengan berbagai kategori di Studinesia",
};

export default function CategoryPage() {
    return <CategoryTemplate />
}
