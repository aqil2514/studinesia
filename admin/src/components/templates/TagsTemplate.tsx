"use client"
import { useEffect } from "react";
import MainContainer from "../layouts/Container/MainContainer";
import { toast } from "sonner";

export const tagsChannel = new BroadcastChannel("tag_article");

export default function TagsTemplate() {
    useEffect(() => {

    tagsChannel.onmessage = (event) => {
      if (event.data?.type === "New_Tags") {
        toast.success("Tag berhasil ditambah");
      }
    };
  }, []);
  return <MainContainer>Soon</MainContainer>;
}
