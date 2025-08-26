import NotFoundTemplate from "@/components/templates/misc/NotFoundtemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
};

export default function NotFoundPage() {
  return <NotFoundTemplate />;
}
