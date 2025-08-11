"use client";

import Link from "next/link";
import { dummyCategories } from "@/mocks/categories";

export default function SidebarCategories() {
  return (
    <div className="p-4 space-y-3 bg-white">
      <h2 className="font-bold text-lg mb-2">Kategori</h2>
      <div className="flex flex-col gap-2">
        {dummyCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/kategori/${cat.slug}`}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 transition"
          >
            {cat.icon}
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
