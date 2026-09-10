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
    <section className="flex flex-col gap-10 p-5 md:p-10 lg:pt-0 lg:pb-5">
      {/* Profile */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-4 ">
        <ProfileAvatar />

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
            {user.name}
          </h1>

          <p className="md:text-xl text-zinc-600">{user.email}</p>
        </div>
      </div>

      {/* Articles */}
      <div>
          <div className="flex justify-between">
            <span className='font-merriweather font-semibold text-lg md:text-2xl inline-block border-b md:border-b-2 border-black pb-1'>
              Suggested
            </span>

            <Link href='#' className="flex items-center gap-1 text-secondary md:text-xl">
              See More 
              <LuArrowRight/>
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
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
  );
}
