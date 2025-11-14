import { ArticleTags } from "@/@types/article";
import {
  createNewArticleN8N,
  createNewArticleTagsN8N,
} from "@/lib/api-server/article.api";
import { createN8NBulksNewTags } from "@/lib/api-server/tags.api";
import { articleMapper } from "@/lib/mappers/article.mapper";
import { uploadImageN8N } from "@/lib/upload/image.upload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { mapArticleFormToDB } = articleMapper;

  const body: FormData = await req.formData();
  const image: File = body.get("image") as File;
  const tags: string[] = JSON.parse(String(body.get("tags")));
  const apiKey = req.headers.get("n8n_key");
  const isValidKey = apiKey === process.env.N8N_TOKEN;

  if (!isValidKey)
    return NextResponse.json(
      { message: "Token N8N Tidak Valid" },
      { status: 400 }
    );

  const tagsId = (await createN8NBulksNewTags(tags)).map((tag) =>
    String(tag.id)
  );

  const imageUrl = await uploadImageN8N(image, "studinesia/articles");
  const payload = mapArticleFormToDB(body, imageUrl);

  const article = await createNewArticleN8N(payload);

  const articleTags: ArticleTags[] = tagsId.map((tag) => {
    return {
      article_id: Number(article[0].id),
      tag_id: Number(tag),
    };
  });

  await createNewArticleTagsN8N(articleTags);

  return NextResponse.json({ message: "Artikel Berhasil Dibuat" });
}
