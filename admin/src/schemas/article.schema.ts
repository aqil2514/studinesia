import { z } from "zod";
import { slugSchema } from "./common.schema";

export const articleSchema = z.object({
  author: z.string().min(1, "Penulis harus diisi"),
  title: z.string().min(1, "Judul artikel harus diisi"),
  slug: slugSchema,
  description: z.string().min(1, "Deskripsi artikel harus diisi"),
  metaDescription: z
    .string()
    .min(50, "Meta description minimal 50 karakter")
    .max(160, "Meta description maksimal 160 karakter"),
  image: z
    .file()
    .mime(
      ["image/jpeg", "image/png", "image/webp"],
      "Gambar yang diterima hanya WEBP, JPEG, dan PNG"
    )
    .max(2 * 1024 * 1024, "Ukuran file maksimal 2MB")
    .optional(),
  imageAlt: z.string().min(1, "Image alternatif wajib diisi"),
  imageCaption: z.string().min(1, "Caption image wajib diisi"),
  content: z.string().min(1, "Konten artikel wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  tags: z
    .array(z.string())
    .min(3, "Minimal memiliki 3 tags")
    .max(10, "Maksimal 10 tags"),
});

export type ArticleSchemaType = z.infer<typeof articleSchema>;
export type ArticleSchemaTypeWithImageUrl = Omit<ArticleSchemaType, "image"> & {
  imageUrl: string;
};

export const articleDefaultValues: ArticleSchemaType = {
  author: "",
  category: "",
  content: "",
  description: "",
  title: "",
  metaDescription: "",
  slug: "",
  imageAlt: "",
  imageCaption: "",
  tags: [],
};
