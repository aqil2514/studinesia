import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleCardSkeleton() {
  return (
    <div className="bg-white h-[450px] w-[350px] shadow-2xl rounded-2xl group">
      <div className="overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        <Skeleton className="w-[350px] h-[180px] rounded-tl-2xl rounded-tr-2xl" />
      </div>

      <div className="space-y-4 mt-4 px-4 relative">
        <Skeleton className="w-full h-6 mx-auto" />

        <Skeleton className="w-1/2 h-4 mx-auto" />

        <Skeleton className="w-full h-[80px]" />
      </div>
    </div>
  );
}
