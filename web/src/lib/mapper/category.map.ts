import { Category } from "@/@types/article";
import { NavigationWithBackground } from "@/@types/navigation";

export function mapCategoryToNavigationWithBackground(
  raw: Category,
  i: number
): NavigationWithBackground {
  const backgroundColorRecord: Record<number, string> = {
    0: "#64748b",
    1: "#0ea5e9",
    2: "#f59e0b",
    3: "#22c55e",
    4: "#ec4899",
    5: "#8b5cf6",
  };

  const result: NavigationWithBackground = {
    link: `/category/${raw.slug}`,
    label: raw.name,
    backgroundColor: backgroundColorRecord[i],
  };

  return result;
}
