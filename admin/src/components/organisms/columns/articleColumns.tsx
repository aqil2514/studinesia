import { ArticleSummary } from "@/@types/article";
import MenuCell from "@/components/featured/articles/MenuCell";
import StatusArticleDropdown from "@/components/featured/articles/StatusArticleDropdown";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";
import Image from "next/image";
import React from "react";
import { formatToLocalTime } from "@/lib/utils";

export const articleColumns: ColumnDef<ArticleSummary>[] = [
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => <MenuCell row={row} />,
  },
  {
    accessorKey: "url_to_image",
    header: "Gambar Utama",
    cell: ({ row }) => (
      <div className="relative w-16 h-16 mx-auto rounded-lg">
        <Image
          fill
          alt={`${row.original.title} Image`}
          src={row.original.url_to_image as string}
          sizes="64px"
          className="rounded-lg object-contain"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Judul Artikel",
    cell: ({ row }) => {
      const title = row.original.title;

      return (
        <span className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger>
              <Info />
            </PopoverTrigger>
            <PopoverContent className="space-y-4">
              <strong className="text-xs text-center">{title}</strong>
              <Separator />
              <article>{row.original.description}</article>
            </PopoverContent>
          </Popover>
          {title}
        </span>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusArticleDropdown row={row} />,
  },
  {
    accessorKey: "published_at",
    header: "Tanggal Terbit",
    cell: ({ row }) => {
      return formatToLocalTime(row.original.published_at!);
    },
  },
];
