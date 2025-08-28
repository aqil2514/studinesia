import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";

interface Props {
  refreshHandler?: () => void | Promise<void>;
  isRefreshing: boolean;
}

export default function RefreshButton({ isRefreshing, refreshHandler }: Props) {
  return (
    <Button disabled={isRefreshing} onClick={refreshHandler} variant={"outline"} size={"sm"}>
      <RefreshCcw className={cn("", isRefreshing && "animate-spin")} />
      <span>Refresh</span>
    </Button>
  );
}
