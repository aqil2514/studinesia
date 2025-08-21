import { Category } from "@/@types/category";
import { formatToLocalTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    id: "name",
    header: "Nama Kategori",
  },
  {
    accessorKey: "created_at",
    id: "created_at",
    header: "Dibuat Pada",
    cell: ({ row }) => formatToLocalTime(row.original.created_at!),
  },
];
