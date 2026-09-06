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
    const { title, content, description, imageUrl } = req.body;
    const userId = req.user?.payload.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing in token" });
    }

    const newArticle = await articleService.createArticle({
      title,
      content,
      description,
      imageUrl,
      user_id: userId,
    });

    return res.status(201).json(newArticle);
  } catch (err: any) {
    const status = err.status || 400;
    return res.status(status).json({ message: err.message });
  }
};

/**
 * Controller to handle updating an article by ID.
 * Protected by verifyAuth middleware.
 */
export const updateArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate ID parameter using existing schema
    const { error: paramError, value: paramValue } = getArticleByIdParamSchema.validate(req.params);
    if (paramError) {
      const err = new Error("Invalid ID format");
      (err as any).status = 400;
      throw err;
    }
    const articleId = paramValue.id;

    // Extract user ID from authenticated request payload (injected by verifyAuth middleware)
    const userId = req.user?.payload.userId;

    if (!userId) {
      const err = new Error("Unauthorized: User ID missing in token");
      (err as any).status = 401;
      throw err;
    }

    const updatedArticle = await articleService.updateArticle(articleId, userId, req.body);

    res.status(200).json(updatedArticle);
  } catch (err) {
    return next(err);
  }
};

/**
 * Controller to handle deleting an article by ID.
 * Protected by verifyAuth middleware.
 */
export const deleteArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate ID parameter using Joi schema (consistent with getArticleById)
    const { error, value } = getArticleByIdParamSchema.validate(req.params);
    if (error) {
      const validationError = new Error("Invalid ID format");
      (validationError as any).status = 400;
      throw validationError;
    }
    const articleId = value.id;

    // Extract user ID from authenticated request payload (injected by verifyAuth middleware)
    const userId = req.user?.payload.userId;

    if (!userId) {
      const err = new Error("Unauthorized: User ID missing in token");
      (err as any).status = 401;
      throw err;
    }

    const response = await articleService.deleteArticle(articleId, userId);

    res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};


