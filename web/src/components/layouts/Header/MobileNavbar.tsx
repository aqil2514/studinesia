import MainLogo from "@/components/atoms/images/MainLogo";
import MobileMenuSheet from "@/components/molecules/sheets/MobileMenuSheet";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function MobileNavbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [isFloating, setIsFloating] = useState<boolean>(false);

  const hasHydrated = useHasHydrated();

  useEffect(() => {
    if (!hasHydrated) return;

    const header = headerRef.current;

    const scrollHandler = () => {
      const yPos = window.scrollY;

      if (header) {
        const headerHeight = header.clientHeight;
        setIsFloating(yPos > headerHeight);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [hasHydrated]);
  return (
    <header
      ref={headerRef}
      className={cn(
        "flex justify-between px-4",
        isFloating && `fixed top-0 left-0 z-50 w-full bg-white duration-200`
      )}
    >
      <MainLogo withLinks="/" />
      <MobileMenuSheet />
    </header>
  );
}
