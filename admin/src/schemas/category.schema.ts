import z from "zod";
import { slugSchema } from "./common.schema";

export const categorySchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  slug: slugSchema,
  description: z.string().optional(),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;

export const categoryDefaultValues: CategorySchemaType = {
  name: "",
  slug: "",
  description: "",
};
