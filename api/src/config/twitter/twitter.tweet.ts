import { ArticleWithAuthorAndCategory } from "src/app/articles/articles.interface";

export function generateTweet(article: ArticleWithAuthorAndCategory): string {
  const baseUrl = 'https://www.studinesia.online';

  // Ambil 3 tag pertama untuk hashtag
  const hashtags = article.tags?.slice(0, 3).map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ') ?? '';

  // Pilih deskripsi singkat
  const description = article.meta_description || article.description || '';

  // Format tweet dengan sapaan & deskripsi singkat
  let tweet = `Hai teman-teman! 🌟\n"${article.title}"\n${description}\nKategori: ${article.category_id.name}\nPenulis: ${article.author_id.name}\n\nBaca selengkapnya: ${baseUrl}/articles/${article.slug} ${hashtags}`;

  // Pastikan tweet <= 280 karakter
  if (tweet.length > 280) {
    // Pangkas deskripsi terlebih dahulu, jika masih panjang baru potong keseluruhan
    const excess = tweet.length - 280;
    const shortenedDescription = description.slice(0, Math.max(0, description.length - excess - 3)) + '...';
    tweet = `Hai teman-teman! 🌟\n"${article.title}"\n${shortenedDescription}\nKategori: ${article.category_id.name}\nPenulis: ${article.author_id.name}\n\nBaca selengkapnya: ${baseUrl}/articles/${article.slug} ${hashtags}`;
  }

  return tweet;
}
