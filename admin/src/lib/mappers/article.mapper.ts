import {
  ArticleDB,
  ArticleSummary,
  ArticleWithAuthorAndCategory,
} from "@/@types/article";
import {
  ArticleSchemaType,
  ArticleSchemaTypeWithImageUrl,
} from "@/schemas/article.schema";
import { calculateReadingTime, stripHtml } from "../utils";

export function mapArticleFormToDB(
  formData: FormData,
  imageUrl: string
): ArticleDB {
  const result: ArticleDB = {
    category_id: Number(formData.get("category")),
    slug: String(formData.get("slug")),
    content: String(formData.get("content")),
    title: String(formData.get("title")),
    author_id: Number(formData.get("author")),
    description: String(formData.get("description")),
    meta_description: String(formData.get("metaDescription")),
    reading_time: calculateReadingTime(
      stripHtml(String(formData.get("content")))
    ),
    url_to_image: imageUrl,
    image_alt: String(formData.get("imageAlt")),
    image_caption: String(formData.get("imageCaption")),
  };

  return result;
}

export function mapArticleDBToForm(
  raw: ArticleWithAuthorAndCategory
): ArticleSchemaTypeWithImageUrl {
  return {
    author: String(raw.author_id.id),
    category: String(raw.category_id.id),
    content: raw.content,
    description: raw.description ?? "",
    metaDescription: raw.meta_description ?? "",
    slug: raw.slug,
    tags: raw.tags,
    title: raw.title,
    imageUrl: String(raw.url_to_image),
    imageAlt: raw.image_alt,
    imageCaption: raw.image_caption,
  };
}

export function mapArticleDataToFormData(raw: ArticleSchemaType): FormData {
  const formData = new FormData();
  formData.append("author", raw.author);
  formData.append("category", raw.category);
  formData.append("content", raw.content);
  formData.append("description", raw.description);
  formData.append("title", raw.title);
  formData.append("metaDescription", raw.metaDescription);
  formData.append("slug", raw.slug);
  formData.append("tags", JSON.stringify(raw.tags));
  formData.append("image", raw.image as File);
  formData.append("imageAlt", raw.imageAlt);
  formData.append("imageCaption", raw.imageCaption);

  return formData;
}

export function mapArticleDbToSummarizedArticle(
  raw: ArticleDB
): ArticleSummary {
  const result: ArticleSummary = {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    published_at: raw.published_at,
    url_to_image: raw.url_to_image,
  };

  return result;
}
