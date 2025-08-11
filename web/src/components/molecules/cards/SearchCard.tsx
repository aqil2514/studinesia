"use client";

import Divider from "@/components/atoms/divider/Divider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { rubik } from "@/config/fonts";
import { FaSearch } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function SearchCard() {
  return (
    <div className="bg-blue-400/80 bg-[url('/images/search-background.jpg')] bg-cover bg-fixed bg-center bg-blend-multiply py-20 px-6 sm:px-12">
      <h3
        className={cn(
          rubik.className,
          "text-white text-4xl font-semibold text-center"
        )}
      >
        Cari di Blog ini
      </h3>

      <Divider className="border-2 border-orange-400 w-24 my-4" />

      <form
        action={"/search"}
        className="max-w-2xl mx-auto mt-6 bg-white/90 rounded-2xl shadow-lg flex overflow-hidden"
      >
        <div className="relative flex-grow">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            id="keyword"
            name="q"
            placeholder="Ketik kata kunci..."
            className="pl-12 h-12 border-0 text-lg focus-visible:ring-blue-500 z-10"
          />
        </div>
        <Button
          type="submit"
          className="h-12 px-6 text-lg font-semibold bg-orange-500 hover:bg-orange-600 transition-colors"
        >
          Cari
        </Button>
      </form>
    </div>
  );
}
