"use client";

import { useEffect } from "react";
import MainContainer from "../layouts/Container/MainContainer";
import { toast } from "sonner";

export const categoryChannel = new BroadcastChannel("category_channel");

export default function CategoryTemplate() {
  useEffect(() => {
    categoryChannel.onmessage = (event) => {
      if (event.data?.type === "New_Category_Add") {
        toast.success("Tambah data kategori berhasil");
      }
    };

    return () => categoryChannel.close();
  }, []);
  return <MainContainer>Soon</MainContainer>;
}
