"use client";
import UserDropdown from "@/components/molecules/dropdown/UserDropdown";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { open, isMobile } = useSidebar();

  return (
    <header
      className={cn(
        "w-full flex justify-between items-center bg-gradient-to-r from-red-500 to-amber-500 px-4 py-3 shadow-md border-b border-red-400 fixed top-0 left-0 duration-200 z-50",
        !isMobile && open && "pl-[260px]"
      )}
    >
      <div className="flex gap-3 items-center">
        <SidebarTrigger className="text-white hover:opacity-80 transition-opacity" />
        <Link href="/dashboard" className="flex items-center">
          <Image
            width={160}
            height={50}
            priority
            alt="Admin logo"
            src="/images/main-logo.png"
            className="hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>
      <UserDropdown />
    </header>
  );
}
