import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { draftMode } from "next/headers";

const SECRET_KEY = process.env.PREVIEW_SECRET || "mysecret";
const MAX_AGE = 10 * 60 * 1000;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = searchParams.get("slug");
  const ts = searchParams.get("ts");
  const sig = searchParams.get("sig");

  if (!slug || !ts || !sig)
    return NextResponse.json({ error: "Invalid params" }, { status: 400 });

  // Cek Expired
  const now = Date.now();
  if (now - parseInt(ts) > MAX_AGE)
    return NextResponse.json({ error: "Link expired" }, { status: 403 });

  // Cek Data
  const data = `${slug}:${ts}`;
  const expectedSig = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(data)
    .digest("hex");

  if (expectedSig !== sig)
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });

  const draft = await draftMode();
  draft.enable();

  // Signature valid, redirect ke Halaman Preview
  return NextResponse.redirect(new URL(`/preview/${slug}`, req.nextUrl.origin));
}
