import { FilterState } from "@/components/molecules/filter/interface";
import BasicSelect from "@/components/molecules/select/BasicSelect";
import { SelectItemState } from "@/components/molecules/select/interface";
import { Button } from "@/components/ui/button";
import { useArticleData } from "@/providers/ArticleProvider";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function CategoryFilter() {
  const { categories, filters, setFilters } = useArticleData();
  const [value, setValue] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const categoryOption: SelectItemState[] = useMemo(
    () =>
      categories.map((cat) => ({
        key: String(cat.id),
        label: cat.name,
      })),
    [categories]
  );

  // sinkronkan value select jika filter category sudah ada
  useEffect(() => {
    const catFilter = filters.find((f) => f.key === "category_id");
    setValue(catFilter ? String(catFilter.value) : "");
  }, [filters]);

  const pushUrlWithFilters = (nextFilters: FilterState[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("filter");
    // reset page saat filter berubah
    params.set("page", "1");
    nextFilters.forEach((f) =>
      params.append("filter", `${f.key}:${f.operator}:${f.value}`)
    );
    router.push(`${pathname}?${params.toString()}`);
  };

  const changeHandler = (e: string) => {
    setValue(e);

    const categoryFilter: FilterState = {
      key: "category_id",
      operator: "eq",
      value: e,
    };

    // replace filter category jika sudah ada
    const nextFilters = [
      ...filters.filter((f) => f.key !== "category_id"),
      categoryFilter,
    ];

    setFilters(nextFilters);
    pushUrlWithFilters(nextFilters);
  };

  const clearCategory = () => {
    const nextFilters = filters.filter((f) => f.key !== "category_id");
    setFilters(nextFilters);
    setValue("");
    pushUrlWithFilters(nextFilters);
  };

  const hasCategory = filters.some((f) => f.key === "category_id");

  return (
    <div className="flex items-center gap-2">
      <BasicSelect
        items={categoryOption}
        value={value}
        onValueChange={changeHandler}
        label="Kategori"
      />
      {hasCategory && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearCategory}
          title="Hapus filter kategori"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
