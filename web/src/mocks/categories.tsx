import { Category } from "@/@types/article";
import { PiggyBank, Briefcase, BarChart3, Cpu } from "lucide-react";

export const dummyCategories: Category[] = [
  {
    id: 1,
    name: "Investasi",
    slug: "investasi",
    icon: <BarChart3 size={18} />,
  },
  {
    id: 2,
    name: "Budgeting",
    slug: "budgeting",
    icon: <PiggyBank size={18} />,
  },
  {
    id: 3,
    name: "Bisnis",
    slug: "bisnis",
    icon: <Briefcase size={18} />,
  },
  {
    id: 4,
    name: "Teknologi Finansial",
    slug: "teknologi-finansial",
    icon: <Cpu size={18} />,
  },
];
