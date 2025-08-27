import { ArticleWithAuthorAndCategory } from "src/app/articles/articles.interface";
import { baseSiteUrl } from "../sites";

export function createSocialPostMessage(article: ArticleWithAuthorAndCategory, maxLength = 500): string {
  // Sapaan acak
  const greetings = [
    "Hai teman-teman! 🌟",
    "Halo semua! 👋",
    "Yuk simak ini! 🔥",
    "Artikel terbaru nih! 📚"
  ];
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Judul artikel
  const title = `"${article.title}"`;

  // Deskripsi singkat
  const descriptionSource = article.meta_description || article.description || article.content;
  let description = descriptionSource.trim().replace(/\s+/g, ' ');
  if (description.length > 150) {
    description = description.substring(0, 147) + '...';
  }

  // Kategori & Penulis
  const category = `Kategori: ${article.category_id.name}`;
  const author = `Penulis: ${article.author_id.name}`;

  // Link artikel
  const url = `${baseSiteUrl}/articles/${article.slug}`;

  // Hashtags dari tag artikel
  const hashtags = article.tags && article.tags.length > 0
    ? article.tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ')
    : '';

  // Gabungkan semuanya
  let message = `${greeting}\n${title}\n${description}\n${category}\n${author}\nBaca selengkapnya: ${url}`;
  
  if (hashtags) {
    // Jika total panjang masih aman, tambahkan hashtags
    if ((message + ' ' + hashtags).length <= maxLength) {
      message += `\n${hashtags}`;
    }
  }

  return message;
}
