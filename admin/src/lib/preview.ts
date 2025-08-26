import crypto from "crypto";
import { blogSiteUrl } from "@/config/site";

const SECRET_KEY = process.env.PREVIEW_SECRET || "mysecret"; 
const PREVIEW_EXPIRE = 10 * 60 * 1000;

export function generatePreviewUrl(slug: string) {
  const ts = Date.now();
  const data = `${slug}:${ts}`;
  const sig = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(data)
    .digest("hex");

  return `${blogSiteUrl}/api/preview?slug=${slug}&ts=${ts}&sig=${sig}`;
}

export function verifyPreviewSignature(slug: string, ts: string, sig: string) {
  const now = Date.now();
  if (now - parseInt(ts) > PREVIEW_EXPIRE) return false;

  const expectedSig = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(`${slug}:${ts}`)
    .digest("hex");

  return expectedSig === sig;
}
