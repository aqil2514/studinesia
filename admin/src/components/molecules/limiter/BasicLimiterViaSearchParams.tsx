import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  maxData: number;
}

export default function BasicLimiterViaSearchParams({ maxData }: Props) {
  const searchParams = useSearchParams();
  const initLimit = searchParams.get("limit");
  const currentParams = new URLSearchParams(searchParams.toString());

  const [limit, setLimit] = useState<number>(
    initLimit && !isNaN(Number(initLimit)) ? Number(initLimit) : 10
  );
  const router = useRouter();

  const changeHandler = (e: string) => {
    const newLimit = Number(e);

    if(newLimit > maxData) return toast.error(`Limit melebihi jumlah data (${maxData}). Aksi dibatalkan!`)

    setLimit(newLimit);

    currentParams.set("limit", newLimit.toString());

    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <Select value={String(limit)} onValueChange={(e) => changeHandler(e)}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10 Data</SelectItem>
        <SelectItem value="20">20 Data</SelectItem>
        <SelectItem value="50">50 Data</SelectItem>
        <SelectItem value="100">100 Data</SelectItem>
      </SelectContent>
    </Select>
  );
}
