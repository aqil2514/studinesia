import RefreshButton from "@/components/atoms/button/refreshButton";
import BasicLimiterViaSearchParams from "@/components/molecules/limiter/BasicLimiterViaSearchParams";
import PaginationViaSearchParams from "@/components/molecules/pagination/PaginationViaSearchParams";

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
  return (
    <div className="flex items-center justify-between bg-white p-4">
      <div className="flex gap-4 items-center">
        <PaginationViaSearchParams />
        <BasicLimiterViaSearchParams />
        <span>{dataCount} Data</span>
      </div>
      <RefreshButton
        isRefreshing={isRefreshing}
        refreshHandler={refreshHandler}
      />
    </div>
  );
}
