import TagsTemplate from "@/components/templates/tags/TagsTemplate";
import { getTags } from "@/lib/api-server/tags.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tag Artikel",
};

export default async function TagsPage() {
  const { data: tags } = await getTags();

  return <TagsTemplate tags={tags!} />;
}
