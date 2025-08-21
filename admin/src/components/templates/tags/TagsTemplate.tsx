"use client";
import { useEffect } from "react";
import MainContainer from "../../layouts/Container/MainContainer";
import { toast } from "sonner";
import { Tag } from "@/@types/tags";
import PageHeaderWithActions from "../../organisms/header/PageHeaderWithActions";
import { BasicTable } from "../../organisms/data-tables/BasicTable";
import { tagColumns } from "../../organisms/columns/tagColumns";

interface Props {
  tags: Tag[];
}

export const tagsChannel = new BroadcastChannel("tag_article");

export default function TagsTemplate({ tags }: Props) {
  useEffect(() => {
    tagsChannel.onmessage = (event) => {
      if (event.data?.type === "New_Tags") {
        toast.success("Tag berhasil ditambah");
      }
    };
  }, []);
  return (
    <MainContainer>
      <PageHeaderWithActions
        title="Tag"
        subtitle="Atur dan kelola Tag"
        addHref="/tags/add"
        addLabel="Tambah Tag"
        openOnBlank
      />

      <BasicTable columns={tagColumns} data={tags} />
    </MainContainer>
  );
}
