import ArticleSlugTemplate from "@/components/templates/ArticleSlugTemplate";

export default async function ArticleSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  //   Update soon
  console.log(slug);
  return <ArticleSlugTemplate />;
}
