import { z } from "zod";

export const articleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .min(5, "Title must be at least 5 characters"),
  description: z.string().trim().optional(),
  imageUrl: z
    .string()
    .trim()
    .optional()
    // Allow empty input or require valid HTTP/HTTPS protocol
    .refine(
      (val) => !val || /^https?:\/\/.+/i.test(val),
      "Please enter a valid URL (e.g. https://...)"
    ),
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .min(20, "Content must be at least 20 characters"),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
