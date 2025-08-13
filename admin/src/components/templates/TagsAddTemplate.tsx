"use client";

import MainContainer from "../layouts/Container/MainContainer";
import TagsForm from "../organisms/forms/tagsForms";

export default function TagsAddTemplate() {
  return (
    <MainContainer>
      <TagsForm handler={(e) => console.log(e)} />
    </MainContainer>
  );
}
