import CategoryAddTemplate from "@/components/templates/category/CategoryAddtemplate";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Tambah Data"
}

export default function CategoryAddPage(){
    return <CategoryAddTemplate />
}