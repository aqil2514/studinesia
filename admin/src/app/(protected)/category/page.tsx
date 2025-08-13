import CategoryTemplate from "@/components/templates/CategoryTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kategori",
};

export default function CategoryPage(){
    return <CategoryTemplate />
}