"use client";

import MainContainer from "@/components/layouts/Container/MainContainer";
import TagsForm from "@/components/organisms/forms/tagsForms";
import { postTags } from "@/lib/client-api/tags.api";

export default function TagsAddTemplate() {
  return (
    <MainContainer>
      <TagsForm handler={(e) => postTags(e)} />
    </MainContainer>
  );
}
