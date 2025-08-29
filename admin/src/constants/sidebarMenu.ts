import { NavigationWithIcon } from "@/@types/items";
import { MdOutlineArticle } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { BiSolidCategory } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { PiTagSimpleFill } from "react-icons/pi";

export const contentMenuItems: NavigationWithIcon[] = [
  {
    label: "Artikel",
    Icon: MdOutlineArticle,
    url: "/article?page=1&limit=10",
    ActionIcon: GoPlus,
    actionUrl: "/article/add",
  },
  {
    label: "Penulis",
    Icon: FaUserEdit,
    url: "/writer",
    ActionIcon: GoPlus,
    actionUrl: "/writer/add",
  },
  {
    label: "Kategori",
    Icon: BiSolidCategory,
    url: "/category",
    ActionIcon: GoPlus,
    actionUrl: "/category/add",
  },
  {
    label: "Tag",
    Icon: PiTagSimpleFill,
    url: "/tags",
    ActionIcon: GoPlus,
    actionUrl: "/tags/add",
  },
];
