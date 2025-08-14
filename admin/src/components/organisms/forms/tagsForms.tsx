import { BasicFormsProps } from "@/@types/forms";
import SubmitButton from "@/components/atoms/button/submitButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tagsDefaultValues, tagsSchema, TagsSchemaType } from "@/schemas/tags.schema";
import { generateSlug } from "@/utils/generateSlug";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoMdRefresh } from "react-icons/io";

export default function TagsForm({
  handler,
  defaultValues,
}: BasicFormsProps<TagsSchemaType>) {
  const form = useForm<TagsSchemaType>({
    defaultValues: defaultValues ?? tagsDefaultValues,
    resolver: zodResolver(tagsSchema),
  });

  const getSlug = () => {
    const slug = generateSlug(form.getValues("name"));

    form.setValue("slug", slug);
  };

  const {isSubmitting} = form.formState
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handler)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Tag</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} placeholder="Finansial" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug Tag</FormLabel>
              <FormControl>
                <div className="flex gap-4">
                  <Input disabled={isSubmitting} placeholder="Finansial" {...field} />
                  <Button
                    type="button"
                    onClick={getSlug}
                    variant={"outline"}
                    size={"icon"}
                  >
                    <IoMdRefresh />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
}
