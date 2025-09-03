import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItemState } from "./interface";

interface Props {
  items: SelectItemState[];
  value: string;
  onValueChange: (e: string) => void;
  label?: string;
}

export default function BasicSelect({
  items,
  onValueChange,
  value,
  label = "item",
}: Props) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Pilih ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem value={item.key} key={item.key}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
