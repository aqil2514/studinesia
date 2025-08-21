import { Author } from "@/@types/author";
import { formatToLocalTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const writerColumns: ColumnDef<Author>[] = [
  {
    accessorKey: "created_at",
    header: "Dibuat pada",
    cell: ({ row }) => {
      return formatToLocalTime(row.original.created_at!);
    },
  },
  {
    accessorKey: "name",
    header: "Nama Penulis",
  },
];
