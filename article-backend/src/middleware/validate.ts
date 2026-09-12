import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      const err = new Error(error.details[0].message);
      (err as any).status = 400;

      return next(err);
    }

    req.body = value;

    next();
  };
};

export default validate;
