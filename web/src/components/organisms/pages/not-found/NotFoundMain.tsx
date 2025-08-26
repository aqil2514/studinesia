"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundMain() {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      {/* Gambar ilustrasi */}
      <Image
        src="/images/not-found.webp"
        alt="Halaman Tidak Ditemukan"
        height={400}
        width={720}
        priority
        className="rounded-xl shadow-lg"
      />

      {/* Judul */}
      <h1 className="text-3xl font-bold">Halaman Tidak Ditemukan</h1>

      {/* Deskripsi */}
      <p className="text-muted-foreground max-w-md">
        Maaf, artikel atau halaman yang kamu cari tidak tersedia. Mungkin sudah
        dihapus atau tautannya salah.
      </p>

      {/* Tombol kembali */}
      <Link href="/">
        <Button size="lg" className="mt-4">
          🔙 Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}
