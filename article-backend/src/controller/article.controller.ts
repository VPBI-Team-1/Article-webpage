import { Request, Response, NextFunction } from "express";
import * as articleService from "../service/article.service";
import {
  getAllArticlesQuerySchema,
  getArticleByIdParamSchema,
} from "../validator/article.validator";

/**
 * Controller to handle fetching paginated articles with cursor-based pagination.
 */
export const getAllArticlesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = getAllArticlesQuerySchema.validate(req.query);
    if (error) {
      const validationError = new Error(error.details[0].message);
      (validationError as any).status = 400;
      throw validationError;
    }

    // value.limit is guaranteed to be a number (default 10), value.cursor is number or undefined
    const result = await articleService.getAllArticles(value.cursor, value.limit);
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
    const { error, value } = getArticleByIdParamSchema.validate(req.params);
    if (error) {
      const validationError = new Error("Invalid ID format");
      (validationError as any).status = 400;
      throw validationError;
    }

    const article = await articleService.getArticleById(value.id);
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
