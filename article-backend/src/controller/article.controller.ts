import { Request, Response, NextFunction } from "express";
import * as articleService from "../service/article.service";

/**
 * Controller to handle fetching paginated articles with cursor-based pagination.
 */
export const getAllArticlesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rawCursor = req.query.cursor;
    const rawLimit = req.query.limit;

    // Guard clause: Validate cursor format if explicitly provided
    if (rawCursor !== undefined && (Number.isNaN(Number(rawCursor)) || Number(rawCursor) <= 0)) {
      const error = new Error("Invalid cursor format");
      (error as any).status = 400;
      throw error;
    }

    const cursor = rawCursor !== undefined ? Number(rawCursor) : undefined;

    // Parse limit, fallback to default of 10 if missing or non-positive
    const parsedLimit = rawLimit ? Number(rawLimit) : 10;
    const limit = Number.isNaN(parsedLimit) || parsedLimit <= 0 ? 10 : parsedLimit;

    const result = await articleService.getAllArticles(cursor, limit);
    res.json(result);
  } catch (err) {
    return next(err);
  }
};

/**
 * Controller to handle fetching a single article by ID.
 */
export const getArticleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);

    // Guard clause: Reject non-numeric or invalid ID parameters
    if (Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
      const error = new Error("Invalid ID format");
      (error as any).status = 400;
      throw error;
    }

    const article = await articleService.getArticleById(id);
    res.json(article);
  } catch (err) {
    return next(err);
  }
};

/**
 * Controller to handle creating a new article.
 * Protected by verifyAuth middleware.
 */
export const createArticleController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { title, content, excerpt, image } = req.body;
    const user = (req as any).user;
    const rawUserId = user?.id ?? user?.userId ?? user?.payload?.userId ?? user?.payload?.id;
    const userId = Number(rawUserId);

    const newArticle = await articleService.createArticle({
      title,
      content,
      excerpt,
      image,
      user_id: userId,
    });

    return res.status(201).json(newArticle);
  } catch (err: any) {
    const status = err.status || 400;
    return res.status(status).json({ message: err.message });
  }
};
