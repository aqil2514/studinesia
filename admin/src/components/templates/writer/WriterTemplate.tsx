"use client";

import { useEffect } from "react";
import MainContainer from "../../layouts/Container/MainContainer";
import { toast } from "sonner";
import { Author } from "@/@types/author";
import PageHeaderWithActions from "../../organisms/header/PageHeaderWithActions";
import { writerColumns } from "../../organisms/columns/writerColumns";
import { BasicTable } from "../../organisms/data-tables/BasicTable";

interface Props {
  authors: Author[];
}

export const writerChannel = new BroadcastChannel("post_new_author");

export default function WriterTemplate({ authors }: Props) {
  useEffect(() => {
    writerChannel.onmessage = (event) => {
      if (event.data?.type === "New_Author") {
        toast.success("Penulis berhasil ditambah");
      }
    };
  }, []);

  return (
    <MainContainer>
      <PageHeaderWithActions
        title="Penulis"
        subtitle="Atur dan kelola penulis"
        addHref="/writer/add"
        addLabel="Tambah Penulis"
        openOnBlank
      />

      <BasicTable columns={writerColumns} data={authors} />
    </MainContainer>
  );
}
