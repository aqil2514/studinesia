"use client";

import MainContainer from "../layouts/Container/MainContainer";
import ArticleForm from "../molecules/forms/articleForms";

export default function ArticleAddTemplate() {
  return (
    <MainContainer>
      <ArticleForm handler={(values) => console.log(values)} />
    </MainContainer>
  );
}
