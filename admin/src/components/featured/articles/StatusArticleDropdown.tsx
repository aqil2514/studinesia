import { ArticleStatus, ArticleSummary } from "@/@types/article";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { patchArticleStatus } from "@/lib/api-client/article.api";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface Props {
  row: Row<ArticleSummary>;
}

const label: Record<ArticleStatus, string> = {
  archived: "Diarsipkan",
  draft: "Draft",
  published: "Terbit",
  scheduled: "Dijadwalkan",
};

const badgeStyle: Record<ArticleStatus, string> = {
  archived: "bg-gray-200 text-gray-700 border-gray-300",
  draft: "bg-yellow-100 text-yellow-800 border-yellow-300",
  published: "bg-green-100 text-green-800 border-green-300",
  scheduled: "bg-blue-100 text-blue-800 border-blue-300",
};

const values = ["archived", "draft", "published"];

export default function StatusArticleDropdown({ row }: Props) {
  const { status, slug } = row.original;
  const router = useRouter();

  const clickHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const status = target.dataset.valueStatus as ArticleStatus;

    const { message, success } = await patchArticleStatus(status, slug);

    if (!success) return toast.error(message);

    toast.success(message);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge className={`${badgeStyle[status!]} cursor-pointer`}>
          {label[status!]}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Edit Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {values.map((value) => {
          const item = label[value as ArticleStatus];
          return (
            <DropdownMenuItem
              data-value-status={value}
              key={value}
              onClick={clickHandler}
            >
              {item}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
