import { ArticleStatus, ArticleSummary } from "@/@types/article";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { Eye, Link, Menu, Pen, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DeleteArticleDialog from "./DeleteArticleDialog";
import { blogSiteUrl } from "@/config/site";
import axios from "axios";

interface Props {
  row: Row<ArticleSummary>;
}

export default function MenuCell({ row }: Props) {
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const status: ArticleStatus = row.original.status!;
  const articleUrl = `${blogSiteUrl}/articles/${row.original.slug}`;

  const openArticle = async () => {
    if (status === "published") return window.open(articleUrl, "_blank");
    try {
      const { data } = await axios.get<{ previewUrl: string }>("/api/preview", {
        params: {
          slug: row.original.slug,
        },
      });

      const previewUrl = data.previewUrl;
      return window.open(previewUrl, "_blank");
    } catch (error) {
      console.error(error);
      throw error;
    }
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
            <Eye />{" "}
            {status === "published" ? "Lihat Artikel" : "Preview Artikel"}
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
}
