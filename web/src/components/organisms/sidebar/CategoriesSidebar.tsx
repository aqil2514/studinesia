"use client";

import Link from "next/link";
import useSWR from "swr";
import { getCategory } from "@/lib/api-client/category.api";
import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarCategories() {
  const { data, isLoading } = useSWR("category-sidebar", () =>
    getCategory({ limit: 6 })
  );

  if (!data || isLoading) return <SkeletonSidebar />;

  return (
    <div className="p-4 space-y-3 bg-white">
      <h2 className="font-bold text-lg mb-2">Kategori</h2>
      <div className="flex flex-col gap-2">
        {data.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 transition"
          >
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const SkeletonSidebar = () => {
  const fetchData = Array.from({ length: 6 });
  return (
    <div className="p-4 space-y-3 bg-white">
      <h2 className="font-bold text-lg mb-2">Kategori</h2>
      <div className="flex flex-col gap-2">
        {fetchData.map((_, i) => (
          <Skeleton className="w-full animate-pulse" key={i + 1} />
        ))}
      </div>
    </div>
  );
};
