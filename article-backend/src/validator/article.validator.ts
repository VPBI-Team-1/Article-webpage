import Joi from "joi";

export interface CreateArticleInput {
  title: string;
  content: string;
  description?: string | null;
  imageUrl?: string | null;
  user_id: number;
}

export const createArticleSchema = Joi.object({
  title: Joi.string().trim().min(1).required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  content: Joi.string().trim().min(1).required().messages({
    "string.empty": "Content is required",
    "any.required": "Content is required",
  }),
  description: Joi.string().trim().allow("", null).optional(),
  imageUrl: Joi.string().trim().allow("", null).optional(),
  user_id: Joi.number().integer().required().messages({
    "number.base": "User ID must be a valid integer",
    "any.required": "User ID is required",
  }),
});

export const getAllArticlesQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).default(10).optional(),
  cursor: Joi.number().integer().min(1).optional(),
});

export const getArticleByIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export interface UpdateArticleInput {
  title?: string;
  content?: string;
  description?: string | null;
  imageUrl?: string | null;
}

export const updateArticleSchema = Joi.object({
  title: Joi.string().trim().min(1).optional(),
  content: Joi.string().trim().min(1).optional(),
  description: Joi.string().trim().allow("", null).optional(),
  imageUrl: Joi.string().trim().allow("", null).optional(),
});
