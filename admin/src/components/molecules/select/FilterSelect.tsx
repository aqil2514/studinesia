"use client";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BasicSelect from "@/components/molecules/select/BasicSelect";
import type { SelectItemState } from "@/components/molecules/select/interface";
import { FilterOperator } from "../filter/interface";
import { useUrlFilters } from "@/hooks/use-url-filters";

export interface FilterSelectProps<
  T extends { id: string | number; name: string }
> {
  /** unique key used in the URL, e.g. "category_id" or "status" */
  filterKey: string;
  /** default operator; usually 'eq' */
  operator?: FilterOperator;
  /** raw dataset to turn into options */
  items: T[];
  /** override how to map item to option */
  toOption?: (item: T) => SelectItemState;
  /** visible label for the select */
  label: string;
}

export default function FilterSelect<
  T extends { id: string | number; name: string }
>(props: FilterSelectProps<T>) {
  const { filterKey, items, label, operator = "eq", toOption } = props;
  const { filters, set, remove } = useUrlFilters();
  const [value, setValue] = useState<string>("");

  const options: SelectItemState[] = useMemo(
    () =>
      toOption
        ? items.map(toOption)
        : items.map((it) => ({ key: String(it.id), label: it.name })),
    [items, toOption]
  );

  // hydrate from URL
  useEffect(() => {
    const fromUrl = filters.find((f) => f.key === filterKey);
    setValue(fromUrl ? String(fromUrl.value) : "");
  }, [filters, filterKey]);

  const onChange = (next: string) => {
    setValue(next);
    set({ key: filterKey, operator, value: next });
  };

  const onClear = () => {
    setValue("");
    remove(filterKey);
  };

  const hasValue = filters.some((f) => f.key === filterKey);

  return (
    <div className="flex items-center gap-2">
      <BasicSelect
        items={options}
        value={value}
        onValueChange={onChange}
        label={label}
      />
      {hasValue && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          title={`Hapus filter ${label.toLowerCase()}`}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
