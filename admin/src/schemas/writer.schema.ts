import z from "zod";

export const writerSchema = z.object({
  name: z.string().min(1, "Nama penulis wajib diisi"),
});

export type WriterSchemaType = z.infer<typeof writerSchema>;

export const writerDefaultValues: WriterSchemaType = { name: "" };
