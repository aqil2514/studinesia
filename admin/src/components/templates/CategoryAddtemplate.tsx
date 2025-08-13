"use client";

import MainContainer from "../layouts/Container/MainContainer";
import CategoryForm from "../organisms/forms/categoryForms";

export default function CategoryAddTemplate() {
  return (
    <MainContainer>
      <CategoryForm handler={(e) => console.log(e)} />
    </MainContainer>
  );
}
