"use client";

import Link from "next/link";
import GridContainer from "../layouts/containers/GridContainer";
import MainContainer from "../layouts/containers/MainContainer";
import Sidebar from "../layouts/Sidebar";

export default function NewsletterConfirmTemplate() {
  return (
    <MainContainer className="flex flex-col items-center justify-center md:block px-4 space-y-4 pt-4">
      <GridContainer>
        <main className="w-full">
          {/* Pesan Langganan */}
          <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
            <h1 className="text-xl font-bold">🎉 Berhasil!</h1>
            <p className="mt-2 text-gray-700">
              Terima kasih sudah mengkonfirmasi langganan! <br />
              Kamu akan mulai menerima newsletter dari kami.
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <Link
              href="/articles"
              className="px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition"
            >
              Lihat Artikel Terbaru
            </Link>
          </div>
        </main>

        <Sidebar />
      </GridContainer>
    </MainContainer>
  );
}
