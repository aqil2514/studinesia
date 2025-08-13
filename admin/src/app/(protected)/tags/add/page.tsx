import TagsAddTemplate from "@/components/templates/TagsAddTemplate";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Tambah Data Tag"
}

export default function TagsAddPage(){
    return <TagsAddTemplate />
}