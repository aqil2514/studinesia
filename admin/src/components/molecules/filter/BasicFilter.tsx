"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterOperator, FilterState } from "./interface";
import { FilterIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectItemState } from "../select/interface";
import BasicSelect from "../select/BasicSelect";
import OperatorSelect from "../select/OperatorSelect";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface Props {
  filters: FilterState[];
  setFilters: (filters: FilterState[]) => void;
  items: SelectItemState[];
}

export default function BasicFilter({ filters, setFilters, items }: Props) {
  const [draftFilters, setDraftFilters] = useState<FilterState[]>(filters);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setDraftFilters(filters);
  }, [filters]);

  useEffect(() => {
    const urlFilters = searchParams.getAll("filter");
    if (urlFilters.length > 0) {
      const parsed: FilterState[] = urlFilters.map((f) => {
        const [key, operator, ...valueParts] = f.split(":");
        return {
          key,
          operator: operator as FilterOperator,
          value: valueParts.join(":"),
        };
      });
      setDraftFilters(parsed);
      setFilters(parsed);
    }
  }, [searchParams, setFilters]);

  const updateFilter = (index: number, patch: Partial<FilterState>) => {
    const updated = [...draftFilters];
    updated[index] = { ...updated[index], ...patch };
    setDraftFilters(updated);
  };

  const addFilterHandler = () => {
    if (items.length === 0) return;
    setDraftFilters([
      ...draftFilters,
      {
        key: items[0].key,
        operator: "eq",
        value: "",
      },
    ]);
  };

  const applyHandler = () => {
    setFilters(draftFilters);

    const params = new URLSearchParams(searchParams.toString());

    params.delete("filter");

    draftFilters.forEach((f) => {
      params.append("filter", `${f.key}:${f.operator}:${f.value}`);
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const resetHandler = () => {
    setDraftFilters([]);
  };

  const label = filters.length === 0 ? "Filter" : `Filter (${filters.length})`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <FilterIcon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[420px] p-4 flex flex-col gap-3">
        {draftFilters.map((filter, index) => (
          <div key={index} className="flex items-center gap-2">
            <BasicSelect
              items={items}
              value={filter.key}
              onValueChange={(e) => updateFilter(index, { key: e })}
            />
            <OperatorSelect
              value={filter.operator}
              onValueChange={(e) => updateFilter(index, { operator: e })}
            />
            <Input
              className="h-8"
              value={filter.value}
              onChange={(e) => updateFilter(index, { value: e.target.value })}
              placeholder="Value..."
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                setDraftFilters(draftFilters.filter((_, i) => i !== index));
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <div className="flex justify-between items-center mt-2">
          <Button variant="outline" size="sm" onClick={addFilterHandler}>
            + Tambah Filter
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={resetHandler}>
              Reset
            </Button>
            <Button variant="default" size="sm" onClick={applyHandler}>
              Terapkan
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
