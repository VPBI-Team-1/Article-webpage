"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLoader } from "react-icons/lu";
import { articleSchema, type ArticleFormData } from "@/app/schemas/article.schema";
import { createArticle, updateArticle } from "@/services/article.service";
import { stripMarkdown } from "@/utils/markdown";
import MarkdownEditor from "./MarkdownEditor";

export interface ArticleFormInitialData {
  id?: number;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  content: string;
}

export interface ArticleFormProps {
  initialData?: ArticleFormInitialData;
  isEdit?: boolean;
  pageTitle?: string;
  submitButtonText?: string;
  onSuccess?: (articleId: number) => void;
}

export default function ArticleForm({
  initialData,
  isEdit = false,
  pageTitle,
  submitButtonText,
  onSuccess,
}: ArticleFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const headingTitle = pageTitle || (isEdit ? "Edit Article" : "Let's Write");
  const buttonLabel = submitButtonText || (isEdit ? "Save Changes" : "Publish");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    mode: "onChange",
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "",
      content: initialData?.content || "",
    },
  });

  // Re-sync form values whenever initialData changes
  useEffect(() => {
    if (!initialData) return;

    reset({
      title: initialData.title || "",
      description: initialData.description || "",
      imageUrl: initialData.imageUrl || "",
      content: initialData.content || "",
    });
  }, [initialData, reset]);

  const onSubmit = async (data: ArticleFormData) => {
    try {
      setServerError(null);

      let finalDescription = data.description?.trim();
      if (!finalDescription && data.content) {
        const stripped = stripMarkdown(data.content);
        finalDescription = stripped.length > 150 ? stripped.slice(0, 150) + "..." : stripped;
      }

      // Guard Clause: Handle update when in edit mode
      if (isEdit && initialData?.id) {
        const updated = await updateArticle(initialData.id, {
          title: data.title.trim(),
          content: data.content.trim(),
          description: finalDescription || "",
          imageUrl: data.imageUrl?.trim() || "",
        });

        if (onSuccess) {
          onSuccess(updated.id);
          return;
        }

        router.push(`/articles/${updated.id}`);
        router.refresh();
        return;
      }

      // Create new article
      const newArticle = await createArticle({
        title: data.title.trim(),
        content: data.content.trim(),
        description: finalDescription || undefined,
        imageUrl: data.imageUrl?.trim() || undefined,
      });

      if (onSuccess) {
        onSuccess(newArticle.id);
        return;
      }

      router.push(`/articles/${newArticle.id}`);
      router.refresh();
    } catch (err: unknown) {
      console.error(isEdit ? "Error updating article:" : "Error creating article:", err);
      const defaultMsg = isEdit
        ? "Failed to update article. Please try again."
        : "Failed to create article. Please try again.";
      const message = err instanceof Error ? err.message : defaultMsg;
      setServerError(message);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 md:py-8">
      {/* Header section */}
      <div className="mb-6">
        <div className="inline-block border-b-2 border-black pb-1">
          <h1 className="text-xl md:text-2xl font-bold font-serif text-gray-900 tracking-tight">
            {headingTitle}
          </h1>
        </div>
      </div>

      {/* Main card container */}
      <div className="w-full rounded-3xl bg-[#f4f4f5] p-5 sm:p-7 md:p-9 shadow-xs border border-gray-200/60">
        {serverError && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Title Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium text-gray-800">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter article title"
              {...register("title")}
              className={`w-full rounded-full border bg-white px-5 py-1.5 text-sm md:text-base outline-none transition-colors placeholder:text-gray-400 ${
                errors.title
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-200 focus:border-black"
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-600 px-3">{errors.title.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-medium text-gray-800">
              Description <span className="text-xs text-gray-500 font-normal">(Optional)</span>
            </label>
            <input
              id="description"
              type="text"
              placeholder="A brief summary of your article..."
              {...register("description")}
              className={`w-full rounded-full border bg-white px-5 py-1.5 text-sm md:text-base outline-none transition-colors placeholder:text-gray-400 ${
                errors.description
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-200 focus:border-black"
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-600 px-3">{errors.description.message}</p>
            )}
          </div>

          {/* Cover Image URL Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="imageUrl" className="text-sm font-medium text-gray-800">
              Cover Image URL <span className="text-xs text-gray-500 font-normal">(Optional)</span>
            </label>
            <input
              id="imageUrl"
              type="url"
              placeholder="https://..."
              {...register("imageUrl")}
              className={`w-full rounded-full border bg-white px-5 py-1.5 text-sm md:text-base outline-none transition-colors placeholder:text-gray-400 ${
                errors.imageUrl
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-200 focus:border-black"
              }`}
            />
            {errors.imageUrl && (
              <p className="text-xs text-red-600 px-3">{errors.imageUrl.message}</p>
            )}
          </div>

          {/* Content Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="content-editor" className="text-sm font-medium text-gray-800">
              Content <span className="text-red-500">*</span>
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <MarkdownEditor
                  id="content-editor"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Start typing..."
                />
              )}
            />
            {errors.content && (
              <p className="text-xs text-red-600 px-3">{errors.content.message}</p>
            )}
          </div>

          {/* Bottom actions */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="flex items-center justify-center gap-2 rounded-full bg-black px-8 py-2.5 text-sm md:text-base font-semibold text-white shadow-xs transition-all hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting && <LuLoader className="w-4 h-4 animate-spin" />}
              <span>{buttonLabel}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
