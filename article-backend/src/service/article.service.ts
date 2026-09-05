import { prisma } from "../config/db";

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
