"use client";

import { useState } from "react";
import MainLogo from "@/components/atoms/images/MainLogo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import SocialMediaLinks from "../navigations/SocialMediaNavigations";
import ContactLinks from "../navigations/ContactNavigations";
import { ContactIcons } from "@/components/atoms/icons/ContactIcons";
import { SocialMediaIcons } from "@/components/atoms/icons/SocialMediaIcons";
import { Input } from "@/components/ui/input";

export default function MobileMenuSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2 transition-transform duration-200">
          {open ? (
            <X className="w-6 h-6 rotate-90 transition-transform duration-200" />
          ) : (
            <Menu className="w-6 h-6 rotate-0 transition-transform duration-200" />
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <MainLogo withLinks="/" />
          </SheetTitle>
          <SheetDescription>
            Segala sesuatu pasti ada ilmunya, untuk itulah Studinesia hadir!
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 gap-4 flex flex-col">
          <form action="search">
            <Input className="w-full" placeholder="Cari Artikel..." name="q" />
          </form>
          <Link href={"/"}>Beranda</Link>
          <Link href={"/articles"}>Artikel</Link>
          <Link href={"/category"}>Kategori</Link>
        </div>

        <section className="space-y-4">
          <ContactLinks
            ContactIcons={ContactIcons}
            className="flex-wrap justify-center bg-slate-100 py-4"
          />
          <SocialMediaLinks
            icons={SocialMediaIcons}
            className="justify-center"
          />
        </section>
      </SheetContent>
    </Sheet>
  );
}
