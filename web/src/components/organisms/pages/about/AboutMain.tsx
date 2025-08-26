import Image from "next/image";

export default function AboutMain() {
  return (
    <main className="prose prose-slate max-w-none px-2 md:px-20 space-y-6">
      <h1>Tentang Kami</h1>
      <p className="text-lg text-slate-600 italic">
        Membangun ruang belajar digital untuk semua generasi.
      </p>

      <figure className="flex flex-col items-center">
        <Image
          src={"/images/main-logo.png"}
          alt="Main Logo Studinesia"
          height={320}
          width={480}
          priority
          className="rounded-xl shadow-md"
        />
        <figcaption className="text-sm text-slate-500 mt-2">
          Logo resmi Studinesia.io
        </figcaption>
      </figure>

      <p>
        <strong>Studinesia.io</strong> adalah platform blog dan edukasi yang
        berfokus pada berbagi pengetahuan lintas bidang. Kami percaya bahwa
        ilmu pengetahuan seharusnya mudah diakses, relevan, dan mampu memberi
        dampak nyata dalam kehidupan sehari-hari.
      </p>

      <h2>Misi Kami</h2>
      <ul>
        <li>Menyediakan artikel yang bermanfaat, akurat, dan mudah dipahami.</li>
        <li>
          Menghubungkan pembaca dengan wawasan dari berbagai bidang, mulai dari{" "}
          <em>teknologi, finansial, kesehatan, humaniora, islami, hingga gaya hidup</em>.
        </li>
        <li>Mendukung pembelajaran berkelanjutan dan pengembangan diri.</li>
      </ul>

      <h2>Kenapa Studinesia?</h2>
      <ul>
        <li>
          <strong>Multi-topik</strong> → satu tempat untuk berbagai wawasan.
        </li>
        <li>
          <strong>Kredibel</strong> → artikel ditulis berdasarkan riset dan pengalaman.
        </li>
        <li>
          <strong>Terbuka</strong> → kami terbuka untuk kolaborasi dan kontribusi penulis lain.
        </li>
      </ul>

      <h2>Siapa di Balik Studinesia?</h2>
      <p>
        Studinesia didirikan oleh sekelompok pembelajar dan praktisi digital
        yang memiliki visi untuk menjadikan pengetahuan lebih inklusif. Kami
        berasal dari berbagai latar belakang, namun memiliki tujuan yang sama:
        menyebarkan ilmu untuk kebermanfaatan bersama.
      </p>

      <h2>Hubungi Kami</h2>
      <p>
        📧 Email: <a href="mailto:info@studinesia.io">info@studinesia.io</a>
        <br />
        🌐 Facebook:{" "}
        <a href="https://facebook.com/studinesia">facebook.com/studinesia</a>
        <br />
        💬 WhatsApp:{" "}
        <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
          +62 812-3456-7890
        </a>
      </p>

      <div className="bg-slate-100 p-4 rounded-xl text-center not-prose">
        <h3 className="font-semibold mb-2">Ingin terhubung lebih dekat?</h3>
        <p className="mb-3">
          Ikuti update terbaru Studinesia atau kirimkan pertanyaan Anda secara langsung.
        </p>
        <a
          href="mailto:info@studinesia.io"
          className="inline-block bg-slate-800 text-white px-4 py-2 rounded-lg shadow hover:bg-slate-700"
        >
          Hubungi Kami
        </a>
      </div>
    </main>
  );
}
