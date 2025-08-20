import { ArticleTags } from "@/@types/article";
import { auth } from "@/auth";
import { mapArticleFormToDB } from "@/lib/mappers/article.mapper";
import {
  createNewArticle,
  createNewArticleTags,
  getArticleBySlug,
  putArticleTags,
  softDeleteArticle,
  updateArticle,
} from "@/lib/server-api/article.api";
import { createBulksNewTags } from "@/lib/server-api/tags.api";
import { uploadImage } from "@/lib/upload/image.upload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: FormData = await req.formData();
  const image: File = body.get("image") as File;
  const tags: string[] = JSON.parse(String(body.get("tags")));
  const session = await auth();
  const token = session?.supabaseAccessToken;

  if (!token)
    return NextResponse.json({ message: "Token tidak ada" }, { status: 400 });

  const tagsId = (await createBulksNewTags(tags, token)).map((tag) =>
    String(tag.id)
  );
  const imageUrl = await uploadImage(image, "studinesia/articles", token);
  const payload = mapArticleFormToDB(body, imageUrl);
  const article = await createNewArticle(payload, token);

  const articleTags: ArticleTags[] = tagsId.map((tag) => {
    return {
      article_id: Number(article[0].id),
      tag_id: Number(tag),
    };
  });

  await createNewArticleTags(articleTags, token);

  return NextResponse.json({ message: "OK" });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = searchParams.get("slug");
  const session = await auth();
  const token = session?.supabaseAccessToken;

  if (!slug)
    return NextResponse.json(
      { message: "Parameter tidak lengkap" },
      { status: 400 }
    );

  if (!token)
    return NextResponse.json(
      { message: "Token tidak tersedia" },
      { status: 401 }
    );

  await softDeleteArticle(slug, token);

  return NextResponse.json({ message: "Artikel berhasil dihapus" });
}

export async function PUT(req: NextRequest) {
  const body: FormData = await req.formData();
  const newSlug = body.get("slug") as string;
  const image: File | undefined = body.get("image") as File | undefined;
  const tags: string[] = JSON.parse(String(body.get("tags")));
  const session = await auth();
  const token = session?.supabaseAccessToken;
  const oldArticle = await getArticleBySlug(newSlug);

  if (!oldArticle.success || !oldArticle.data)
    return NextResponse.json(
      { message: "Artikel tidak ditemukan! Pastikan anda tidak mengubah slug" },
      { status: 400 }
    );

  let imageUrl: string = String(oldArticle.data.url_to_image);

  if (!token)
    return NextResponse.json({ message: "Token tidak ada" }, { status: 400 });

  if (image instanceof File && image.size > 0) {
    imageUrl = await uploadImage(image, "studinesia/articles", token);
  }

  const tagsId = (await createBulksNewTags(tags, token)).map((tag) =>
    String(tag.id)
  );

  const payload = mapArticleFormToDB(body, imageUrl);
  const article = await updateArticle(payload, token);

  const articleTags: ArticleTags[] = tagsId.map((tag) => {
    return {
      article_id: Number(article[0].id),
      tag_id: Number(tag),
    };
  });

  await putArticleTags(articleTags, token);

  return NextResponse.json({ message: "OK" });
}
