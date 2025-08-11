"use client";

import { useState } from "react";
import MainContainer from "../layouts/Container/MainContainer";
import { Article } from "@/@types/article";
import ArticleDialog from "../molecules/dialogs/ArticleDialog";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ArticleAddTemplate() {
  const [article, setArticle] = useState<Article>({
    source: { id: null, name: "" },
    author: "",
    title: "",
    description: "",
    url: "",
    urlToImage: "",
    publishedAt: "",
    content: "",
  });

  const [loadingAI, setLoadingAI] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("source.")) {
      const key = name.split(".")[1] as "id" | "name";
      setArticle((prev) => ({
        ...prev,
        source: { ...prev.source, [key]: value },
      }));
    } else {
      setArticle((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Article to submit:", article);
  };

  const handleGenerateAI = async () => {
    try {
      setLoadingAI(true);
      const res = await axios.post("/api/articles/generate", {
        title: article.title,
        description: article.description,
      });
      setArticle((prev) => ({
        ...prev,
        content: res.data?.content || "",
      }));
    } catch (err) {
      console.error("Gagal generate AI:", err);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <MainContainer className="w-screen">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Tambah Artikel</CardTitle>
        </CardHeader>
        <CardContent>
          <ArticleDialog onSelect={setArticle} />
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="source.id">Source ID</Label>
              <Input
                id="source.id"
                name="source.id"
                placeholder="Source ID"
                value={article.source.id || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="source.name">Source Name</Label>
              <Input
                id="source.name"
                name="source.name"
                placeholder="Source Name"
                value={article.source.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                placeholder="Author"
                value={article.author || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Title"
                value={article.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description"
                value={article.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                placeholder="URL"
                value={article.url}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="urlToImage">URL to Image</Label>
              <Input
                id="urlToImage"
                name="urlToImage"
                placeholder="URL to Image"
                value={article.urlToImage}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="publishedAt">Published At</Label>
              <Input
                id="publishedAt"
                name="publishedAt"
                placeholder="Published At"
                value={article.publishedAt}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Content"
                rows={8}
                value={article.content}
                onChange={handleChange}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={handleGenerateAI}
            disabled={loadingAI}
          >
            {loadingAI ? "Menghasilkan..." : "Generate AI"}
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Simpan
          </Button>
        </CardFooter>
      </Card>
    </MainContainer>
  );
}
