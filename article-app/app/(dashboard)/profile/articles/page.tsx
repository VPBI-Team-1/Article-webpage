"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ArticleList from "@/app/components/ArticleList";
import { ArticleCardResponse, fetchArticles } from "@/services/article.service";
import { useAuth } from "@/app/providers/AuthProvider";

export default function ProfileArticlesPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [articles, setArticles] = useState<ArticleCardResponse[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthLoading) return;

    if (!user) {
      setIsLoading(false);
      return;
    }

    const loadInitialArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchArticles({ limit: 10, userId: user.id });
        setArticles(response.data);
        setNextCursor(response.meta.nextCursor);
        setHasMore(response.meta.hasMore);
      } catch (err) {
        console.error("Failed to load user articles:", err);
        setError("Failed to load articles. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialArticles();
  }, [user, isAuthLoading]);

  if (isAuthLoading) {
    return (
      <section className="flex flex-col gap-6 px-5 pb-5 md:px-10 md:pb-10">
        <div className="flex items-center justify-between">
          <span className="font-merriweather font-semibold text-lg md:text-2xl inline-block border-b md:border-b-2 border-black pb-1">
            Your Articles
          </span>
          <Link
            href="/profile"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            ← Back to Profile
          </Link>
        </div>
        <p className="text-sm text-zinc-500">Loading user profile...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="flex flex-col gap-6 px-5 pb-5 md:px-10 md:pb-10">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-zinc-900">
            Anda belum login
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Silakan login terlebih dahulu untuk melihat artikel Anda.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6 px-5 pb-5 md:px-10 md:pb-10">
      <div className="flex items-center justify-between">
        <span className="font-merriweather font-semibold text-lg md:text-2xl inline-block border-b md:border-b-2 border-black pb-1">
          Your Articles
        </span>
        <Link
          href="/profile"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          ← Back to Profile
        </Link>
      </div>

      {isLoading ? (
        <p className="text-sm text-zinc-500">Loading articles...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : articles.length === 0 ? (
        <p className="text-sm text-zinc-500">Belum ada artikel yang ditulis.</p>
      ) : (
        <ArticleList
          key={user.id}
          initialArticles={articles}
          initialNextCursor={nextCursor}
          initialHasMore={hasMore}
          userId={user.id}
        />
      )}
    </section>
  );
}
