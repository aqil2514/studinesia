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

interface Props {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  name: string;
  email: string;
  subscribeHandler: () => Promise<string | number | undefined>;
}

export default function NewsletterDialog({
  onOpenChange,
  open,
  name,
  email,
  subscribeHandler,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ingin berlangganan Studinesia?</DialogTitle>
          <DialogDescription>
            Hai <span className="font-medium">{name}</span>,<br />
            Pastikan email benar! Kami akan mengirimkan informasi terkait
            Studinesia ke <span className="font-bold">{email}</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-amber-600 hover:bg-amber-700"
            onClick={subscribeHandler}
          >
            Konfirmasi
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Batal</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
