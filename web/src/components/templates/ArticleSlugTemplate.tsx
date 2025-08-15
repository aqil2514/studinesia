"use client";
import { ArticleWithAuthorAndCategory } from "@/@types/article";
import MainContainer from "../layouts/containers/MainContainer";
import Sidebar from "../layouts/Sidebar";
import { rubik } from "@/config/fonts";
import DOMPurify from "isomorphic-dompurify";
import Divider from "../atoms/divider/Divider";
import Image from "next/image";
import { Pen } from "lucide-react";
import { BiSolidCategory } from "react-icons/bi";
import Link from "next/link";


interface Props {
  article: ArticleWithAuthorAndCategory;
}

export default function ArticleSlugTemplate({ article }: Props) {
  const sanitizedContent = DOMPurify.sanitize(article.content);
  return (
    <MainContainer className="grid grid-cols-1 md:grid-cols-[75%_auto] gap-4 pt-4 px-4">
      <div className="px-20">
        <header className="space-y-8">
          <h1 className={`text-center ${rubik.className} text-4xl`}>
            {article.title}
          </h1>
          <Divider />
          <div className="flex justify-center gap-4">
            <span className="flex gap-2 items-center">
              <Pen /> {article.author_id.name}
            </span>
            <Link href={`/category/${article.category_id.slug}`}>
            <span className="flex gap-2 items-center">
              <BiSolidCategory /> {article.category_id.name}
            </span>
            </Link>
          </div>
          <Image
            src={article.url_to_image}
            height={523}
            width={720}
            alt={`${article.title} Ilustartions`}
            className="rounded-2xl block mx-auto w-auto h-auto"
          />
          <Divider />
        </header>
        <main className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{__html:sanitizedContent}} />
      </div>

      <Sidebar />
    </MainContainer>
  );
}
