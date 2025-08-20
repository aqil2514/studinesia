import { ArticleSummary } from "@/@types/article";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { softDeleteArticle } from "@/lib/client-api/article.api";
import { isoToIndoTime } from "@/lib/utils";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Eye, Info, Link, Menu, Pen, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const baseArticleUrl = "https://studinesia.vercel.app/articles";

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
    cell: ({ row }) => {
      const articleDate = new Date(row.original.published_at as string);
      const now = new Date();
      let statusText: string = "";

      if (now > articleDate) statusText = "Telah Terbit";
      else if (now < articleDate) statusText = "Dijadwalkan";

      return statusText;
    },
  },
  {
    accessorKey: "published_at",
    header: "Tanggal Terbit",
    cell: ({ row }) => isoToIndoTime(row.original.published_at as string),
  },
];

const MenuCell: React.FC<{ row: Row<ArticleSummary> }> = ({ row }) => {
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const articleUrl = `${baseArticleUrl}/${row.original.slug}`;

  const openArticle = () => {
    window.open(articleUrl, "_blank");
  };

  const editArticle = () => {
    window.open(`/article/edit/${row.original.slug}`, "_blank");
  };

  const copyArticleLink = () => {
    navigator.clipboard.writeText(articleUrl);
    toast.success("Link artikel berhasil disalin");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{row.original.title}</DropdownMenuLabel>
          <DropdownMenuItem onClick={openArticle}>
            <Eye /> Lihat Artikel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={copyArticleLink}>
            <Link /> Salin Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={editArticle}>
            <Pen /> Edit Artikel
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteDialog(true)}
            className="text-red-500"
          >
            <Trash className="text-red-500" /> Hapus Artikel
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteArticleDialog
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
        row={row}
      />
    </>
  );
};

const DeleteArticleDialog: React.FC<{
  deleteDialog: boolean;
  setDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  row: Row<ArticleSummary>;
}> = ({ deleteDialog, row, setDeleteDialog }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const deleteHandler = async () => {
    const response = await softDeleteArticle(row.original.slug, setIsLoading);

    if (!response.success) {
      toast.error(response.message);
    }

    toast.success(response.message);
    router.refresh();
    setDeleteDialog(false);
  };

  return (
    <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Artikel?</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus artikel{" "}
            <b>{row.original.title}</b>? <br />
            Tindakan ini tidak bisa dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isLoading}>Batalkan</Button>
          </DialogClose>
          <Button
            disabled={isLoading}
            variant={"destructive"}
            onClick={deleteHandler}
          >
            {isLoading ? "Menghapus..." : "Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
