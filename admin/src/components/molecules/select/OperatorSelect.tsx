import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils"; // optional: kalau kamu punya helper cn
import { FilterOperator } from "../filter/interface";

interface Props {
  value: FilterOperator | string;
  onValueChange: (e: FilterOperator) => void;
  placeholder?: string;
  className?: string;
}

const operatorItems: Record<FilterOperator, string> = {
  eq: "=",
  neq: "≠",
  lt: "<",
  lte: "≤",
  gt: ">",
  gte: "≥",
  like: "LIKE",
  ilike: "ILIKE",
  in: "IN",
};

export default function OperatorSelect({
  value,
  onValueChange,
  placeholder = "Operator",
  className,
}: Props) {
  return (
    <Select
      value={String(value)}
      onValueChange={(v) => onValueChange(v as FilterOperator)}
    >
      <SelectTrigger className={cn?.("w-32", className) ?? "w-32"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {(Object.entries(operatorItems) as [FilterOperator, string][]).map(
          ([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}
