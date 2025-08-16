import CategorySlugTemplate from "@/components/templates/CategorySlugTemplate";
import { getCategoryBySlug } from "@/lib/api-server/category.api";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = (await getCategoryBySlug(slug))[0];

  return {
    title: `Kategori ${category.name}`,
    description: `Artikel tentang ${category.name}`,
  };
}

export default async function CategorySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const categoryId = String(category[0].id);

  return <CategorySlugTemplate categoryId={categoryId} />;
}
