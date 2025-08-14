import { ArticleTags } from "@/@types/article";
import { mapArticleFormToDB } from "@/lib/mappers/article.mapper";
import {
  createNewArticle,
  createNewArticleTags,
} from "@/lib/server-api/article.api";
import { createBulksNewTags } from "@/lib/server-api/tags.api";
import { uploadImage } from "@/lib/upload/image.upload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: FormData = await req.formData();
  const image: File = body.get("image") as File;
  const tags: string[] = JSON.parse(String(body.get("tags")));

  const tagsId = (await createBulksNewTags(tags)).map((tag) => String(tag.id));
  const imageUrl = await uploadImage(image, "studinesia/articles");
  const payload = mapArticleFormToDB(body, imageUrl);
  const article = await createNewArticle(payload);

  const articleTags: ArticleTags[] = tagsId.map((tag) => {
    return {
      article_id: Number(article[0].id),
      tag_id: Number(tag),
    };
  });

  await createNewArticleTags(articleTags);

  return NextResponse.json({ message: "OK" });
}
