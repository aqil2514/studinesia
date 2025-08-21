"use client";
import MainContainer from "@/components/layouts/Container/MainContainer";
import WriterForm from "@/components/organisms/forms/writerForms";
import { postAuthor } from "@/lib/client-api/author.api";

export default function WriterAddTemplate() {
  return (
    <MainContainer>
      <WriterForm handler={(e) => postAuthor(e)} />
    </MainContainer>
  );
}
