"use client";
import { ContactIcons } from "@/components/atoms/icons/ContactIcons";
import { SocialMediaIcons } from "@/components/atoms/icons/SocialMediaIcons";
import MainLogo from "@/components/atoms/images/MainLogo";
import { Separator } from "@/components/ui/separator";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ContactLinks from "@/components/molecules/navigations/ContactNavigations";
import SocialMediaLinks from "@/components/molecules/navigations/SocialMediaNavigations";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import { cn } from "@/lib/utils";

export default function DesktopNavbar() {
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
        "hidden md:block",
        isFloating && `fixed top-0 left-0 z-50 w-full bg-white duration-200`
      )}
    >
      <section className="flex justify-between bg-gray-200 px-8">
        <ContactLinks ContactIcons={ContactIcons} />
        <SocialMediaLinks icons={SocialMediaIcons} />
      </section>
      <section className="flex justify-around">
        <MainLogo withLinks="/" />
        <Navigation />
      </section>
      <Separator />
    </header>
  );
}

const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <FaSearch />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <form action="search">
              <Input
                className="w-[320px]"
                placeholder="Cari Artikel..."
                name="q"
              />
            </form>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={"/"}>Beranda</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={"/articles"}>Artikel</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={"/category"}>Kategori</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
