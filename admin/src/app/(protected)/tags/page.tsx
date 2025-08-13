import TagsTemplate from "@/components/templates/TagsTemplate";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Tag Artikel"
}

export default function TagsPage(){
    return <TagsTemplate />
}