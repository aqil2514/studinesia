import WriterAddTemplate from "@/components/templates/WriterAddTemplate";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Tambah Penulis"
}

export default function WriterPage(){
    return <WriterAddTemplate />
}