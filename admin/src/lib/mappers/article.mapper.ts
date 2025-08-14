import { ArticleDB } from "@/@types/article";
import { ArticleSchemaType } from "@/schemas/article.schema";
import { calculateReadingTime, stripHtml } from "../utils";

export function mapArticleFormToDB(formData: FormData, imageUrl:string): ArticleDB {
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
  };

  return result;
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

  return formData;
}
