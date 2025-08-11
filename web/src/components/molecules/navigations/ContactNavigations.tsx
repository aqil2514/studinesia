import { IconsWithLabel } from "@/@types/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ContactLinksProps {
  ContactIcons: IconsWithLabel[];
  className?: string;
}

export default function ContactLinks({ ContactIcons, className }: ContactLinksProps) {
  return (
    <div className={cn("flex gap-4", className)}>
      {ContactIcons.map((CI, i) => (
        <Link key={i + 1} href={CI.link} className="flex gap-2 items-center">
          <CI.Icon /> {CI.label}
        </Link>
      ))}
    </div>
  );
}
