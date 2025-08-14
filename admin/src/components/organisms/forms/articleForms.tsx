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
import BasicCombobox from "../../molecules/combobox/BasicCombobox";
import InputTags from "@/components/atoms/inputs/InputTags";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info, Loader } from "lucide-react";
import ImagePicker from "@/components/atoms/inputs/ImagePicker";
import RichTextEditor from "../../molecules/editor/RichTextEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios, { isAxiosError } from "axios";
import { BasicFormsProps } from "@/@types/forms";
import { useArticleFormData } from "@/providers/ArticleFormProvider";
import { BasicOption } from "@/@types/items";

interface SubComponentProps {
  form: UseFormReturn<ArticleSchemaType>;
}

export default function ArticleForm({
  handler,
  defaultValues,
}: BasicFormsProps<ArticleSchemaType>) {
  const form = useForm<ArticleSchemaType>({
    defaultValues: defaultValues ?? articleDefaultValues,
    resolver: zodResolver(articleSchema),
  });
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  const onSubmit = (values: ArticleSchemaType) => {
    handler(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="metadata">
          <TabsList>
            <TabsTrigger disabled={isLoadingAi} value="metadata">
              Metadata
            </TabsTrigger>
            <TabsTrigger disabled={isLoadingAi} value="editor">
              Editor
            </TabsTrigger>
          </TabsList>
          <MetadataTabs form={form} />
          <EditorTabs
            form={form}
            setIsLoading={setIsLoadingAi}
            isLoading={isLoadingAi}
          />
        </Tabs>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const MetadataTabs: React.FC<SubComponentProps> = ({ form }) => {
  const { authors, categories } = useArticleFormData();

  const authorOptions: BasicOption[] = authors.map((author) => ({
    label: author.name,
    value: String(author.id),
  }));

  const categoryOptions: BasicOption[] = categories.map((category) => ({
    label: category.name,
    value: String(category.id),
  }));

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
              <BasicCombobox
                comboboxFor="penulis"
                options={authorOptions}
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
                options={categoryOptions}
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

type EditorTabsProps = {
  setIsLoading: (state: boolean) => void;
  isLoading: boolean;
};
const EditorTabs: React.FC<SubComponentProps & EditorTabsProps> = ({
  form,
  setIsLoading,
  isLoading,
}) => {
  const [mountCount, setMounCount] = useState<number>(0);

  const aiHandler = async () => {
    const title = form.getValues("title");
    const description = form.getValues("description");

    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/articles/generate", {
        title,
        description,
      });

      alert("Generate AI Berhasil");
      form.setValue("content", data.content);
      setMounCount(mountCount + 1);
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const data = error.response?.data;

        alert(data.message ?? "Terjadi kesalahan");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <TabsContent value="editor" className="space-y-8">
      <Button
        type="button"
        variant={"outline"}
        disabled={isLoading}
        onClick={aiHandler}
      >
        {isLoading ? (
          <>
            {" "}
            <Loader className="animate-spin" /> Generating...
          </>
        ) : (
          "Generate AI"
        )}
      </Button>
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Konten Artikel</FormLabel>
            <FormControl>
              <RichTextEditor
                key={mountCount}
                onChange={field.onChange}
                value={field.value}
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
