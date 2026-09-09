"use client";

import { useState } from "react";
import ArticleCard from "./ArticleCard";
import { ArticleCardResponse, fetchArticles } from "@/services/article.service";

interface ArticleListProps {
  initialArticles: ArticleCardResponse[];
  initialNextCursor: number | null;
  initialHasMore: boolean;
}

export default function ArticleList({
  initialArticles,
  initialNextCursor,
  initialHasMore,
}: ArticleListProps) {
  const [articles, setArticles] = useState<ArticleCardResponse[]>(initialArticles);
  const [nextCursor, setNextCursor] = useState<number | null>(initialNextCursor);
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadMore = async () => {
    // Throttling: prevent multiple concurrent requests or triggering when no more data
    if (isLoading || !hasMore || nextCursor === null) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchArticles({ cursor: nextCursor, limit: 10 });
      setArticles((prev) => [...prev, ...response.data]);
      setNextCursor(response.meta.nextCursor);
      setHasMore(response.meta.hasMore);
    } catch (err) {
      console.error("Failed to load more articles:", err);
      setError("Failed to load more articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-8'>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {error && (
        <p className='text-red-500 text-center text-sm'>{error}</p>
      )}

      {hasMore && (
        <button
          type='button'
          onClick={handleLoadMore}
          disabled={isLoading}
          className='bg-tertiary md:text-xl border border-black font-medium rounded-2xl py-1 px-3 mx-auto shadow-tactile hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed'>
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
}
