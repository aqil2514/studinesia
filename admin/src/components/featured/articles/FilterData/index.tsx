import FilterSelect from "@/components/molecules/select/FilterSelect";
import { useMemo } from "react";
import { useArticleData } from "@/providers/ArticleProvider";
import { ArticleStatus } from "@/@types/article";

export default function FilterData() {
  const { categories } = useArticleData();
  const categoryOption = useMemo(
    () =>
      categories.map((cat) => ({
        id: String(cat.id),
        name: cat.name,
      })),
    [categories]
  );

  const statusOption: { id: ArticleStatus; name: string }[] = [
    {
      id: "archived",
      name: "Diarsipkan",
    },
    {
      id: "draft",
      name: "Draft",
    },
    {
      id: "scheduled",
      name: "Dijadwalkan",
    },
    {
      id: "published",
      name: "Terbit",
    },
  ];

  return (
    <div className="flex gap-4">
      <FilterSelect
        filterKey="category_id"
        items={categoryOption}
        label="Kategori"
      />
      <FilterSelect
        filterKey="status"
        items={statusOption}
        label="Status"
      />
    </div>
  );
}
