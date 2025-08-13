import z from "zod";
import { slugSchema } from "./common.schema";

export const tagsSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  slug: slugSchema,
});

export type TagsSchemaType = z.infer<typeof tagsSchema>;

export const tagsDefaultValues: TagsSchemaType = {
  name: "",
  slug: "",
};
