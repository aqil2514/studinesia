import { Skeleton } from "@/components/ui/skeleton";

export function ArticleListCardSkeleton() {
  return (
    <>
      <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden">
        <Skeleton className="object-cover w-12 h-12" />
      </div>
      <div>
        <Skeleton className="text-sm font-medium hover:text-blue-600 line-clamp-2 w-full" />
        <Skeleton className="text-xs text-gray-500 w-full" />
      </div>
    </>
  );
}
