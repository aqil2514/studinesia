import { NextRequest, NextResponse } from "next/server";
import { generatePreviewUrl } from "@/lib/preview-article";

const SECRET_KEY = process.env.PREVIEW_SECRET || "mysecret";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const previewUrl = generatePreviewUrl(slug, SECRET_KEY);

  return NextResponse.json({ previewUrl });
}
