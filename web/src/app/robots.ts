import { baseSiteUrl } from "@/config/baseUrl";
import { MetadataRoute } from "next";

export default function robot(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: `${baseSiteUrl}/sitemap.xml`,
  };
}
