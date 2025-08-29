import WriterTemplate from "@/components/templates/writer/WriterTemplate";
import { getAllAuthor } from "@/lib/api-server/author.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penulis",
};

export default async function WriterPage() {
  const author = await getAllAuthor();
  return <WriterTemplate authors={author} />;
}
