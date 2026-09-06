import Joi from "joi";

export interface CreateArticleInput {
  title: string;
  content: string;
  excerpt?: string | null;
  image?: string | null;
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
  excerpt: Joi.string().trim().allow("", null).optional(),
  image: Joi.string().trim().allow("", null).optional(),
  user_id: Joi.number().integer().required().messages({
    "number.base": "User ID must be a valid integer",
    "any.required": "User ID is required",
  }),
});
