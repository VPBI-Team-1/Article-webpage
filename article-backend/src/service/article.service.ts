import { prisma } from "../config/db";
import {
  CreateArticleInput,
  createArticleSchema,
  UpdateArticleInput,
  updateArticleSchema,
} from "../validator/article.validator";

export interface ArticleCardResponse {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  created_at: Date | null;
}

export interface PaginatedArticlesResponse {
  data: ArticleCardResponse[];
  meta: {
    hasMore: boolean;
    nextCursor: number | null;
  };
}

/**
 * Fetch paginated articles using cursor-based pagination (plus-one method).
 * Restricts payload to card attributes: id, title, excerpt, image, created_at.
 */
export const getAllArticles = async (
  cursorId?: number,
  limit: number = 10,
): Promise<PaginatedArticlesResponse> => {
  // Query limit + 1 to check whether more records exist beyond the current page
  const items = await prisma.articles.findMany({
    take: limit + 1,
    ...(cursorId ? { skip: 1, cursor: { id: cursorId } } : {}),
    orderBy: { id: "desc" },
    select: {
      id: true,
      title: true,
      excerpt: true,
      image: true,
      created_at: true,
    },
  });

  // If results exceed limit, there are more items for subsequent requests
  const hasMore = items.length > limit;
  if (hasMore) {
    items.pop(); // Remove the extra (+1) item from current page results
  }

  // Determine the next cursor from the last item in the current batch
  const nextCursor = hasMore && items.length > 0 ? items[items.length - 1].id : null;

  return {
    data: items,
    meta: {
      hasMore,
      nextCursor,
    },
  };
};

/**
 * Fetch a single article by its primary key ID with all fields.
 * Throws a 404 error if the article is not found.
 */
export const getArticleById = async (id: number) => {
  const article = await prisma.articles.findUnique({
    where: { id },
  });

  // Guard clause: immediately throw 404 error if article is missing
  if (!article) {
    const error = new Error("Article not found");
    (error as any).status = 404;
    throw error;
  }

  return article;
};

/**
 * Create a new article.
 * Validates payload using Joi schema and persists record to the database.
 */
export const createArticle = async (data: CreateArticleInput) => {
  // Guard clause / validation: validate input using Joi schema
  const { error, value } = createArticleSchema.validate(data);
  if (error) {
    const validationError = new Error(error.details[0].message);
    (validationError as any).status = 400;
    throw validationError;
  }

  // Insert article record into database
  const newArticle = await prisma.articles.create({
    data: {
      title: value.title,
      content: value.content,
      excerpt: value.excerpt || (value.content ? value.content.slice(0, 150) : ""),
      image: value.image || "",
      user_id: value.user_id,
    },
  });

  return newArticle;
};

/**
 * Update an existing article.
 * Validates payload, checks article existence (404), checks user ownership (403),
 * and updates specified fields in the database.
 */
export const updateArticle = async (
  id: number,
  userId: number,
  data: UpdateArticleInput,
) => {
  // 1. Validate payload using Joi schema
  const { error, value } = updateArticleSchema.validate(data);
  if (error) {
    const validationError = new Error(error.details[0].message);
    (validationError as any).status = 400;
    throw validationError;
  }

  // 2. Guard Clause 1: Verify article exists
  const existingArticle = await prisma.articles.findUnique({
    where: { id },
  });

  if (!existingArticle) {
    const notFoundError = new Error("Article not found");
    (notFoundError as any).status = 404;
    throw notFoundError;
  }

  // 3. Guard Clause 2: Verify article ownership
  if (existingArticle.user_id !== userId) {
    const forbiddenError = new Error("You are not allowed to update this article");
    (forbiddenError as any).status = 403;
    throw forbiddenError;
  }

  // 4. Update article record in database
  const updatedArticle = await prisma.articles.update({
    where: { id },
    data: {
      ...(value.title && { title: value.title }),
      ...(value.content && { content: value.content }),
      ...(value.excerpt !== undefined && { excerpt: value.excerpt || "" }),
      ...(value.image !== undefined && { image: value.image || "" }),
    },
  });

  return updatedArticle;
};
