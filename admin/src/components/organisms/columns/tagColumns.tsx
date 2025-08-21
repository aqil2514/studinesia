import { Tag } from "@/@types/tags";
import { formatToLocalTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const tagColumns: ColumnDef<Tag>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    id: "name",
    header: "Nama Tag",
  },
  {
    accessorKey: "slug",
    id: "slug",
    header: "Slug",
  },
  {
    accessorKey: "created_at",
    id: "created_at",
    header: "Dibuat Pada",
    cell: ({ row }) => formatToLocalTime(row.original.created_at!),
  },
];
