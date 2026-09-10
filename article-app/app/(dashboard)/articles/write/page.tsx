"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { useWriteModal } from "@/app/providers/WriteModalProvider";
import WriteAuthGuard from "@/app/components/WriteAuthGuard";
import ArticleForm from "@/app/components/ArticleForm";

export default function WriteArticlePage() {
  const { user, isLoading } = useAuth();
  const { openWriteModal } = useWriteModal();
  const router = useRouter();

  // Redirect unauthenticated direct URL visitors back to /articles and trigger login modal
  useEffect(() => {
    if (!isLoading && !user) {
      openWriteModal();
      router.replace("/articles");
    }
  }, [isLoading, user, openWriteModal, router]);

  // Guard Clause 1: Loading state
  if (isLoading) {
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
    return <WriteAuthGuard />;
  }

  // Authenticated state: Render form
  return <ArticleForm />;
}
