import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface Props {
  isSubmitting: boolean;
}

export default function SubmitButton({ isSubmitting }: Props) {
  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Loader className="animate-spin" /> Menyimpan...{" "}
        </>
      ) : (
        "Simpan"
      )}
    </Button>
  );
}
