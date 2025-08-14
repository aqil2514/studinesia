"use client";

import { useEffect } from "react";
import MainContainer from "../layouts/Container/MainContainer";
import { toast } from "sonner";

export const writerChannel = new BroadcastChannel("post_new_author");

export default function WriterTemplate() {
  useEffect(() => {

    writerChannel.onmessage = (event) => {
      if (event.data?.type === "New_Author") {
        toast.success("Penulis berhasil ditambah");
      }
    };
  }, []);

  return <MainContainer>Soon</MainContainer>;
}
