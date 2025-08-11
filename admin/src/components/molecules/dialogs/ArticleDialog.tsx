"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Article } from "@/@types/article"
import axios from "axios"

export default function ArticleDialog({ onSelect }: { onSelect: (article: Article) => void }) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  
  const form = useForm<{ query: string }>({
    defaultValues: { query: "" }
  })

 async function onSubmit(data: { query: string }) {
  setLoading(true)
  try {
    const res = await axios.get(`/api/articles/search`, {
      params: { query: data.query },
    })
    console.log(res.data)
    setArticles(res.data?.data || [])
  } catch (err) {
    console.error("Error fetching articles:", err)
    setArticles([])
  } finally {
    setLoading(false)
  }
}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Cari Artikel</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cari Artikel</DialogTitle>
        </DialogHeader>

        {/* Form pencarian */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 mb-4">
          <Input placeholder="Masukkan judul artikel..." {...form.register("query")} />
          <Button type="submit" disabled={loading}>
            {loading ? "Mencari..." : "Cari"}
          </Button>
        </form>

        {/* Hasil pencarian */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {articles.length === 0 && !loading && (
            <p className="text-sm text-gray-500">Belum ada hasil.</p>
          )}
          {articles.map((article, index) => (
            <div
              key={index + 1}
              className="flex justify-between items-center border rounded p-2 hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{article.title}</p>
                <p className="text-sm text-gray-500 truncate">{article.description}</p>
              </div>
              <Button
                size="sm"
                onClick={() => onSelect(article)}
              >
                Pilih
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
