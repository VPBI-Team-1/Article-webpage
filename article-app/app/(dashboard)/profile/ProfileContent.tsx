"use client";

import { useEffect, useState } from "react";
import ArticleCard from "@/app/components/ArticleCard";
import { fetchArticles, ArticleCardResponse } from "@/services/article.service";
import { useAuth } from "../../providers/AuthProvider";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

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
  const [articles, setArticles] = useState<ArticleCardResponse[]>([]);
  const [isArticlesLoading, setIsArticlesLoading] = useState(true);

   useEffect(() => {
    if (!user) return;

    const loadArticles = async () => {
      try {
        const response = await fetchArticles({ limit: 10 });
        setArticles(response.data);
      } catch (error) {
        console.error("Failed to load profile articles:", error);
      } finally {
        setIsArticlesLoading(false);
      }
    };

    loadArticles();
  }, [user]);

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

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      {/* Profile */}
      <section className="flex items-center justify-center sm:justify-start px-4 py-16 sm:px-6 sm:py-20">
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
            {isArticlesLoading ? (
              <p className="text-sm text-zinc-500">Loading articles...</p>
            ) : articles.length > 0 ? (
              articles.slice(0,6).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <p className="text-sm text-zinc-500">
                Belum ada tulisan.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
