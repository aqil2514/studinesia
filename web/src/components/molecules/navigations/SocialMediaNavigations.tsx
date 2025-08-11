import { BasicIcons } from "@/@types/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SocialMediaLinksProps {
  icons: BasicIcons[];
  className?: string;
}
export default function SocialMediaLinks({
  icons,
  className,
}: SocialMediaLinksProps) {
  return (
    <div className={cn("flex justify-end items-center gap-4", className)}>
      {icons.map((ic, i) => (
        <Link key={i + 1} href={ic.link}>
          <ic.Icon />
        </Link>
      ))}
    </div>
  );
}
