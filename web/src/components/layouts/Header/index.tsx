"use client";

import { useIsMobile } from "@/hooks/useMobile";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Header() {
  const isMobile = useIsMobile();

  if (isMobile) return <MobileNavbar />;

  return <DesktopNavbar />;
}
