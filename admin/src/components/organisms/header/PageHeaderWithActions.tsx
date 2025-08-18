import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/molecules/header/PageHeader";

interface PageHeaderWithActionsProps {
  title: string;
  subtitle?: string;
  addHref?: string;
  addLabel?: string;
  openOnBlank?: boolean;
}

export default function PageHeaderWithActions({
  title,
  subtitle,
  addHref,
  openOnBlank,
  addLabel = "Tambah",
}: PageHeaderWithActionsProps) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <PageHeader title={title} subtitle={subtitle} />
      {addHref && (
        <Button asChild>
          <Link href={addHref} target={openOnBlank ? "_blank" : "_self"}>
            + {addLabel}
          </Link>
        </Button>
      )}
    </header>
  );
}
