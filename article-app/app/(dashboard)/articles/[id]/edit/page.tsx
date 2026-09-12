"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { fetchArticleById, ArticleDetailResponse } from "@/services/article.service";
import ArticleForm from "@/app/components/ArticleForm";

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = use(params);
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [article, setArticle] = useState<ArticleDetailResponse | null>(null);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch article data on mount
  useEffect(() => {
    let isMounted = true;

    async function loadArticle() {
      try {
        setIsArticleLoading(true);
        const data = await fetchArticleById(id);
        if (!isMounted) return;

        if (!data) {
          setError("Article not found");
          return;
        }

        setArticle(data);
      } catch (err: unknown) {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : "Failed to load article";
        setError(msg);
      } finally {
        if (isMounted) {
          setIsArticleLoading(false);
        }
      }
    }

    loadArticle();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Route protection redirect effect for non-authors and unauthenticated visitors
  useEffect(() => {
    if (isAuthLoading || isArticleLoading) return;

    if (!user) {
      router.replace("/articles");
      return;
    }

    if (article && user.id !== article.authorid) {
      router.replace(`/articles/${id}`);
    }
  }, [isAuthLoading, isArticleLoading, user, article, id, router]);

  // Guard Clause 1: Loading state
  if (isAuthLoading || isArticleLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3 text-secondary">
          <div className="w-8 h-8 border-3 border-gray-300 border-t-black rounded-full animate-spin" />
          <p className="text-sm">Loading editor...</p>
        </div>
      </div>
    );
  }

  // Guard Clause 2: Unauthenticated state
  if (!user) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <p className="text-sm text-secondary">Redirecting to articles...</p>
      </div>
    );
  }

  // Guard Clause 3: Article not found or fetch error
  if (!article || error) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12 flex flex-col justify-center items-center gap-4 min-h-[50vh]">
        <h2 className="text-xl font-bold text-gray-900">{error || "Article Not Found"}</h2>
        <button
          type="button"
          onClick={() => router.push("/articles")}
          className="px-5 py-2 text-sm font-semibold text-white bg-black rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Back to Articles
        </button>
      </div>
    );
  }

  // Guard Clause 4: Unauthorized access (user is not the author)
  if (user.id !== article.authorid) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12 flex flex-col justify-center items-center gap-3 min-h-[50vh]">
        <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
        <p className="text-sm text-secondary">You are not authorized to edit this article.</p>
        <p className="text-xs text-gray-400">Redirecting to article...</p>
      </div>
    );
  }

  // Authenticated Author State: Render reusable article form with prefilled data
  return (
    <ArticleForm
      isEdit
      pageTitle="Edit Article"
      submitButtonText="Save Changes"
      initialData={{
        id: article.id,
        title: article.title,
        description: article.description,
        imageUrl: article.imageUrl,
        content: article.content,
      }}
    />
  );
}
