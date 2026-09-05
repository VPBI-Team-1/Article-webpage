import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil — Budi Santoso",
  description:
    "Profil singkat Budi Santoso, designer & developer, beserta tulisan terbaru.",
};

type Article = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  dateIso: string;
};

const ARTICLES: Article[] = [
  {
    category: "Design",
    title: "Membangun Produk Digital yang Sederhana",
    excerpt:
      "Tentang bagaimana kesederhanaan dalam desain dapat membuat sebuah produk lebih mudah dipahami dan digunakan.",
    date: "12 September 2026",
    dateIso: "2026-09-12",
  },
  {
    category: "Personal",
    title: "Catatan Kecil tentang Proses Kreatif",
    excerpt:
      "Beberapa pemikiran tentang proses menemukan ide, membuat kesalahan, lalu memperbaikinya menjadi sesuatu yang lebih baik.",
    date: "5 September 2026",
    dateIso: "2026-09-05",
  },
  {
    category: "Product",
    title: "Kenapa Detail Kecil Itu Penting",
    excerpt:
      "Hal-hal kecil sering kali tidak terlihat, tetapi justru menentukan bagaimana seseorang merasakan sebuah pengalaman.",
    date: "28 Agustus 2026",
    dateIso: "2026-08-28",
  },
];

function ProfileAvatar() {
  return (
    <div
      role="img"
      aria-label="Foto profil Budi Santoso"
      className="h-32 w-32 rounded-full bg-zinc-300 text-zinc-700 flex items-center justify-center text-3xl font-semibold select-none"
    >
      BS
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-md hover:border-zinc-300">
      <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-zinc-100 text-zinc-700">
        {article.category}
      </span>
      <h3 className="text-lg font-semibold mt-3 text-zinc-900">{article.title}</h3>
      <p className="text-sm text-zinc-600 mt-2 leading-relaxed">{article.excerpt}</p>
      <time
        dateTime={article.dateIso}
        className="block text-xs text-zinc-600 mt-4"
      >
        {article.date}
      </time>
    </article>
  );
}

export default function ProfilPage() {
  return (
    <main className="flex flex-col flex-1">
      <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-20 min-h-[50vh]">
        <ProfileAvatar />
        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-200">
          Budi Santoso
        </h1>
        <p className="mt-3 max-w-md text-base sm:text-lg leading-relaxed text-zinc-600">
          Designer &amp; developer yang tertarik pada teknologi, desain produk,
          dan bagaimana ide sederhana bisa berubah menjadi sesuatu yang berguna.
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          Jakarta • Designer &amp; Developer
        </p>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 px-4 sm:px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-widest text-zinc-600">
              Articles
            </p>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Tulisan terbaru
              </h2>
              <span className="text-sm text-zinc-600">3 tulisan</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-3">
            {ARTICLES.map((article) => (
              <ArticleCard key={article.title} article={article} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
