"use client";

import { useAuth } from "../../providers/AuthProvider";
import Link from "next/link";

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
export default function ProfileContent() {
  const { user, isLoading } = useAuth();

  console.log("ProfileContent user:", user);

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-zinc-500">Loading profile...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-zinc-900">
            Anda belum login
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Silakan login terlebih dahulu untuk melihat profil.
          </p>
        </div>
      </main>
    );
  }

  function ArticleCard({ article }: { article: Article }) {
    return (
      <article className="rounded-xl border border-zinc-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-md hover:border-zinc-300">
        <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-zinc-100 text-zinc-700">
          {article.category}
        </span>
        <h3 className="text-lg font-semibold mt-3 text-zinc-900">
          {article.title}
        </h3>
        <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
          {article.excerpt}
        </p>
        <time
          dateTime={article.dateIso}
          className="block text-xs text-zinc-600 mt-4"
        >
          {article.date}
        </time>
      </article>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      {/* Profile */}
      <section className="flex items-center justify-start px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <ProfileAvatar />
          <div className="flex flex-col">
            <h1 className="mt-0 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              {user.name}
            </h1>

            <p className="mt-1 text-base text-zinc-600 sm:text-lg">{user.email}</p>

            <p className="mt-1 text-sm text-zinc-500">Designer &amp; Developer</p>
          </div>
          <div className="mt-4">
            <Link
              href={`/profile/edit/${user.id}`}
              className="px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-8">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
              Latest Post
            </h2>
            <a href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
              See more →
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ARTICLES.map((article) => (
              <ArticleCard key={article.title} article={article} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
