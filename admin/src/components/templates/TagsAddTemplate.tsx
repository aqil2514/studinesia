"use client";

import { postTags } from "@/lib/client-api/tags.api";
import MainContainer from "../layouts/Container/MainContainer";
import TagsForm from "../organisms/forms/tagsForms";

export default function TagsAddTemplate() {
  return (
    <MainContainer>
      <TagsForm handler={(e) => postTags(e)} />
    </MainContainer>
  );
}
