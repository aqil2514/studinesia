import { BasicFormsProps } from "@/@types/forms";
import SubmitButton from "@/components/atoms/button/submitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  writerDefaultValues,
  writerSchema,
  WriterSchemaType,
} from "@/schemas/writer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function WriterForm({
  handler,
  defaultValues,
}: BasicFormsProps<WriterSchemaType>) {
  const form = useForm<WriterSchemaType>({
    defaultValues: defaultValues ?? writerDefaultValues,
    resolver: zodResolver(writerSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handler)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Penulis</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Penulis 1..."
                  {...field}
                />
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
