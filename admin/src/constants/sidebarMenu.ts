import { NavigationWithIcon } from "@/@types/items";
import { MdOutlineArticle } from "react-icons/md";
import { GoPlus } from "react-icons/go";

export const contentMenuItems: NavigationWithIcon[] = [
  {
    label: "Artikel",
    Icon: MdOutlineArticle,
    url: "/article",
    ActionIcon: GoPlus,
    actionUrl: "/article/add",
  },
];
