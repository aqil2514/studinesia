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
import { softDeleteArticle } from "@/lib/api-client/article.api";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  deleteDialog: boolean;
  setDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  row: Row<ArticleSummary>;
}

export default function DeleteArticleDialog({
  deleteDialog,
  row,
  setDeleteDialog,
}: Props) {
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
}
