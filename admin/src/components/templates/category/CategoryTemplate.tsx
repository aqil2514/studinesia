"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Category } from "@/@types/category";
import MainContainer from "@/components/layouts/Container/MainContainer";
import PageHeaderWithActions from "@/components/organisms/header/PageHeaderWithActions";
import { BasicTable } from "@/components/organisms/data-tables/BasicTable";
import { categoryColumns } from "@/components/organisms/columns/categoryColumns";

interface Props {
  categories: Category[];
}

export const categoryChannel = new BroadcastChannel("category_channel");

export default function CategoryTemplate({ categories }: Props) {
  useEffect(() => {
    categoryChannel.onmessage = (event) => {
      if (event.data?.type === "New_Category_Add") {
        toast.success("Tambah data kategori berhasil");
      }
    };

    return () => categoryChannel.close();
  }, []);
  return (
    <MainContainer>
      <PageHeaderWithActions
        title="Kategori"
        subtitle="Atur dan kelola kategori"
        addHref="/category/add"
        addLabel="Tambah Kategori"
        openOnBlank
      />

      <BasicTable columns={categoryColumns} data={categories} />
    </MainContainer>
  );
}
