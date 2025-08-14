"use client";

import { useEffect } from "react";
import MainContainer from "../layouts/Container/MainContainer";
import { toast } from "sonner";

export const articleChannel = new BroadcastChannel("article_channel");
export default function ArticleTemplate() {
    useEffect(() => {
    articleChannel.onmessage = (event) => {
      if (event.data?.type === "New_Article_Add") {
        toast.success("Tambah artikel berhasil");
      }
    };

    return () => articleChannel.close();
  }, []);

  return <MainContainer>Soon</MainContainer>;
}
