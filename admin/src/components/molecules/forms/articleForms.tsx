import {
  articleDefaultValues,
  articleSchema,
  ArticleSchemaType,
} from "@/schemas/article.schema";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateSlug } from "@/utils/generateSlug";

import { IoIosSettings, IoMdRefresh } from "react-icons/io";
import BasicCombobox from "../combobox/BasicCombobox";
import { dummyCategori } from "@/dummies/dummyCategory";
import InputTags from "@/components/atoms/inputs/InputTags";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import ImagePicker from "@/components/atoms/inputs/ImagePicker";
import RichTextEditor from "../editor/RichTextEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  defaultValues?: ArticleSchemaType;
  handler: (values: ArticleSchemaType) => void | Promise<void>;
}

interface SubComponentProps {
  form: UseFormReturn<ArticleSchemaType>;
}

export default function ArticleForm({ handler, defaultValues }: Props) {
  const form = useForm<ArticleSchemaType>({
    defaultValues: defaultValues ?? articleDefaultValues,
    resolver: zodResolver(articleSchema),
  });

  const onSubmit = (values: ArticleSchemaType) => {
    handler(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="metadata">
          <TabsList>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
          </TabsList>
          <MetadataTabs form={form} />
          <EditorTabs form={form} />
        </Tabs>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const MetadataTabs: React.FC<SubComponentProps> = ({ form }) => {
  const getSlug = () => {
    const title = form.getValues("title");
    const slug = generateSlug(title);

    form.setValue("slug", slug);
  };

  return (
    <TabsContent value="metadata" className="space-y-8">
      <FormField
        control={form.control}
        name="author"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Penulis</FormLabel>
            <FormControl>
              <Input placeholder="Penulis Artikel" {...field} />
            </FormControl>
            <FormDescription>Defaultnya Admin</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Judul Artikel</FormLabel>
            <FormControl>
              <Input placeholder="Judul Artikel" {...field} />
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
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <div className="flex gap-4">
                <Input placeholder="Slug" {...field} />
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

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kategori</FormLabel>
            <FormControl>
              <BasicCombobox
                comboboxFor="kategori"
                options={dummyCategori}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <InputTags values={field.value} setValues={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Deskripsi</FormLabel>
            <FormControl>
              <Textarea placeholder="Deskripsi artikel" {...field} />
            </FormControl>
            <FormDescription>
              Deskripsi internal yang akan tampil di situs
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="metaDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta Deskripsi</FormLabel>
            <FormControl>
              <Textarea placeholder="Meta Deskripsi" {...field} />
            </FormControl>
            <FormDescription>
              Untuk kepentingan SEO. <PopoverMetaDescription form={form} />{" "}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gambar Utama</FormLabel>
            <FormControl>
              <ImagePicker file={field.value} setFile={field.onChange} />
            </FormControl>
            <FormDescription>
              Ini akan dijadikan sebagai gambar utama
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </TabsContent>
  );
};

const EditorTabs: React.FC<SubComponentProps> = ({ form }) => {
  return (
    <TabsContent value="editor">
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Konten Artikel</FormLabel>
            <FormControl>
              <RichTextEditor
                onChange={field.onChange}
                initialContent={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </TabsContent>
  );
};

const PopoverMetaDescription: React.FC<SubComponentProps> = ({ form }) => {
  const clickHandler = () => {
    const description = form.getValues("description") ?? "";
    const value =
      description.length > 160 ? description.slice(0, 160) : description;
    form.setValue("metaDescription", value, { shouldValidate: true });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" size={"icon"} variant={"outline"}>
          <Info />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] space-y-4">
        <p>
          Jika digenerate, akan mengambil 160 kata pertama dari Deskripsi yang
          telah ditulis.
        </p>
        <Button
          className="w-full"
          variant={"outline"}
          type="button"
          onClick={clickHandler}
        >
          <IoIosSettings />
          <span>Generate</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
