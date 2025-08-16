import { NavigationWithBackground } from "@/@types/navigation";
import Loading from "@/app/loading";
import { rubik } from "@/config/fonts";
import {
  getCategoryAndLimit,
} from "@/lib/api-client/category.api";
import { mapCategoryToNavigationWithBackground } from "@/lib/mapper/category.map";
import Link from "next/link";
import useSWR from "swr";

export default function CategoryNavigation() {
  const { data, isLoading } = useSWR("category", () => getCategoryAndLimit(6));

  if (!data || isLoading) return <Loading />;

  const categories: NavigationWithBackground[] = data.map(
    mapCategoryToNavigationWithBackground
  );

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {categories.map((category, index) => (
        <Link
          key={index + 1}
          href={category.link}
          style={{ backgroundColor: category.backgroundColor }}
          className={`${rubik.className} w-full p-15 text-white text-center font-bold hover:-translate-y-4 hover:opacity-80 duration-400`}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}
