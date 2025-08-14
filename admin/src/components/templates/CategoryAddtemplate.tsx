"use client";

import { postCategory } from "@/lib/client-api/category.api";
import MainContainer from "../layouts/Container/MainContainer";
import CategoryForm from "../organisms/forms/categoryForms";

export default function CategoryAddTemplate() {
  return (
    <MainContainer>
      <CategoryForm handler={(e) => postCategory(e)} />
    </MainContainer>
  );
}
