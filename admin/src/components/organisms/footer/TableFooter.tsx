import RefreshButton from "@/components/atoms/button/refreshButton";
import BasicLimiterViaSearchParams from "@/components/molecules/limiter/BasicLimiterViaSearchParams";
import PaginationViaSearchParams from "@/components/molecules/pagination/PaginationViaSearchParams";
import { useSearchParams } from "next/navigation";

interface Props {
  dataCount: number;
  isRefreshing: boolean;
  refreshHandler?: () => void | Promise<void>;
}

export default function TableFooter({
  dataCount,
  isRefreshing,
  refreshHandler,
}: Props) {
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit"));

  const maxPage = Math.ceil(dataCount / limit);

  return (
    <div className="flex items-center justify-between bg-white p-4">
      <div className="flex gap-4 items-center">
        <PaginationViaSearchParams maxPage={maxPage} />
        <BasicLimiterViaSearchParams maxData={dataCount} />
        <span>{dataCount} Data</span>
      </div>
      <RefreshButton
        isRefreshing={isRefreshing}
        refreshHandler={refreshHandler}
      />
    </div>
  );
}
