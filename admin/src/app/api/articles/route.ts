import { ArticleTags, GetArticlesParams } from "@/@types/article";
import { auth } from "@/auth";
import { articleMapper } from "@/lib/mappers/article.mapper";
import {
  articleApiServer,
  createNewArticle,
  createNewArticleTags,
  getArticleBySlug,
  patchArticleStatus,
  putArticleTags,
  softDeleteArticle,
  updateArticle,
} from "@/lib/api-server/article.api";
import { createBulksNewTags } from "@/lib/api-server/tags.api";
import { uploadImage } from "@/lib/upload/image.upload";
import { NextRequest, NextResponse } from "next/server";

const { getArticlesWithRelations } = articleApiServer;

const { mapArticleFormToDB } = articleMapper;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category_id = searchParams.get("category_id");
  const limit = searchParams.get("limit") as number | null;
  const mode = searchParams.get("mode");
  const page = searchParams.get("page") as number | null;
  const type = searchParams.get("type");

  const params: GetArticlesParams = {
    category_id,
    limit,
    mode,
    page,
    type,
  };

  const data = await getArticlesWithRelations(params);

  return NextResponse.json(data);
}

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

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { searchParams } = req.nextUrl;
  const session = await auth();
  const token = session?.supabaseAccessToken;
  const patch = searchParams.get("patch");

  if (!token)
    return NextResponse.json({ message: "Token tidak ada" }, { status: 400 });

  if (!patch)
    return NextResponse.json(
      { message: "Permintaan tidak valid" },
      { status: 400 }
    );

  if (patch === "status") {
    await patchArticleStatus(body.slug, body.status, token);
  }

  return NextResponse.json({ message: "PK" });
}
