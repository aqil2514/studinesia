import { ArticleSummary } from "@/@types/article";
import { useArticleData } from "@/providers/ArticleProvider";
import { Row } from "@tanstack/react-table";

export default function CategoryCell({ row }: { row: Row<ArticleSummary> }) {
  const { category } = row.original;
  const { categories } = useArticleData();

  const selectedCategory = categories.find(
    (cat) => cat.name.toLowerCase() === category.toLowerCase()
  );

  return (
    <span title={`Kategori ID : ${selectedCategory?.id}`}>{category}</span>
  );
}
