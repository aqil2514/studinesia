"use client";
import { postAuthor } from "@/lib/api/author.api";
import MainContainer from "../layouts/Container/MainContainer";
import WriterForm from "../organisms/forms/writerForms";

export default function WriterAddTemplate() {
  
  return (
    <MainContainer>
      <WriterForm handler={(e) => postAuthor(e)} />
    </MainContainer>
  );
}
