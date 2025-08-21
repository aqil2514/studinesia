"use client";

import MainContainer from "@/components/layouts/Container/MainContainer";
import CategoryForm from "@/components/organisms/forms/categoryForms";
import { postCategory } from "@/lib/client-api/category.api";

export default function CategoryAddTemplate() {
  return (
    <MainContainer>
      <CategoryForm handler={(e) => postCategory(e)} />
    </MainContainer>
  );
}
