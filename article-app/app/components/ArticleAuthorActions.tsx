"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { deleteArticle } from "@/services/article.service";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface ArticleAuthorActionsProps {
  articleId: number;
  authorId: number;
}

export default function ArticleAuthorActions({
  articleId,
  authorId,
}: ArticleAuthorActionsProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Guard Clause 1: While checking authentication, do not render actions
  if (isLoading) return null;

  // Guard Clause 2: If user is not logged in, do not render actions
  if (!user) return null;

  // Guard Clause 3: If logged in user is not the author of this article, do not render actions
  if (user.id !== authorId) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setDeleteError(null);

      await deleteArticle(articleId);

      setIsDeleteModalOpen(false);
      router.push("/articles");
      router.refresh();
    } catch (err: unknown) {
      console.error("Failed to delete article:", err);
      const message =
        err instanceof Error ? err.message : "Failed to delete article. Please try again.";
      setDeleteError(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <span className="inline-flex items-center gap-1.5 text-sm md:text-base font-normal text-zinc-400">
        <Link
          href={`/articles/${articleId}/edit`}
          className="hover:text-zinc-900 transition-colors underline-offset-2 hover:underline cursor-pointer"
        >
          Edit
        </Link>
        <span className="text-zinc-300">•</span>
        <button
          type="button"
          onClick={() => {
            setDeleteError(null);
            setIsDeleteModalOpen(true);
          }}
          className="hover:text-red-600 transition-colors underline-offset-2 hover:underline cursor-pointer"
        >
          Delete
        </button>
      </span>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        description={
          deleteError
            ? `${deleteError} - Are you sure you want to try again?`
            : "Are you sure you want to delete this article? This action cannot be undone."
        }
      />
    </>
  );
}
