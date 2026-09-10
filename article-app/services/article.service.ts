export interface ArticleCardResponse {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  authorid: number;
  author: string;
  created_at: string | null;
}

export interface ArticleDetailResponse {
  id: number;
  title: string;
  content: string;
  description: string;
  imageUrl: string;
  created_at: string | null;
  updated_at: string | null;
  authorid: number;
  author: string;
}

export interface PaginatedArticlesResponse {
  data: ArticleCardResponse[];
  meta: {
    hasMore: boolean;
    nextCursor: number | null;
  };
}

export interface FetchArticlesParams {
  cursor?: number | null;
  limit?: number;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8000";

/**
 * Fetch paginated articles from the backend with cursor-based pagination.
 */
export async function fetchArticles(
  params: FetchArticlesParams = {}
): Promise<PaginatedArticlesResponse> {
  const { cursor, limit = 10 } = params;
  const searchParams = new URLSearchParams();

  searchParams.set("limit", limit.toString());
  if (cursor !== undefined && cursor !== null) {
    searchParams.set("cursor", cursor.toString());
  }

  const url = `${API_BASE_URL}/api/articles?${searchParams.toString()}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetch single article details by ID.
 */
export async function fetchArticleById(
  id: string | number
): Promise<ArticleDetailResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/articles/${id}`, {
      cache: "no-store",
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching article by id:", err);
    return null;
  }
}

/**
 * Formats ISO date string to a human-readable format like "Sep 6, 2026".
 */
export function formatDate(dateString?: string | null): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export interface CreateArticleInput {
  title: string;
  content: string;
  description?: string;
  imageUrl?: string;
}

export interface CreateArticleResponse {
  id: number;
  title: string;
  content: string;
  description: string;
  imageUrl: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

/**
 * Create a new article.
 */
export async function createArticle(
  data: CreateArticleInput
): Promise<CreateArticleResponse> {
  const res = await fetch(`${API_BASE_URL}/api/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      description: data.description || undefined,
      imageUrl: data.imageUrl || undefined,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to create article (${res.status} ${res.statusText})`
    );
  }

  return res.json();
}

