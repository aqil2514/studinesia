import NewsletterConfirmTemplate from "@/components/templates/NewsletterConfirmTemplate";
import { confirmNewsletter } from "@/lib/api-server/newsletter.api";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{ token: string }>;
}

export const metadata: Metadata = {
  title: "Langganan Berhasil",
  robots: { index: false },
};

export default async function NewsletterConfirmPage({ searchParams }: Props) {
  const { token } = await searchParams;

  await confirmNewsletter(token);
  return <NewsletterConfirmTemplate />;
}
