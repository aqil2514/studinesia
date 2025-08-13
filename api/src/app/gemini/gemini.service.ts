import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async generateText(title: string, description: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
Tulislah sebuah artikel *evergreen* dalam bahasa Indonesia.
Judul: ${title}
Deskripsi: ${description}

Pastikan agar outputnya berupa struktur HTML. 
Misal jika tulisan tebal <strong>Ini tulisan tebal</strong>
Jika ada list <ul><li>Ini list</li></ul>
...dst

Langsung tulis dari dalam <body> saja. Tidak perlu satu HTML full

Kriteria penulisan:
- Gaya bahasa informatif, mudah dipahami, dan menarik bagi pembaca awam.
- Hindari konten musiman atau berita yang cepat kadaluarsa.
- Sertakan pembukaan yang memancing rasa ingin tahu.
- Gunakan subjudul (H2/H3) untuk membagi topik menjadi bagian-bagian.
- Tambahkan contoh konkret atau tips praktis jika relevan.
- Panjang artikel minimal 800 kata.
- Akhiri dengan kesimpulan atau ajakan untuk bertindak.
- Jangan sertakan hal-hal yang tidak relevan atau mengulang terlalu sering.
    `,
    });

    return response.text;
  }
}
