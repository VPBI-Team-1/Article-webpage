import express from "express";
import * as authService from "../service/auth.service";

type Register = {
  body: {
    name: string;
    email: string;
    password: string;
  };
};

export const registerController = async (
  req: Register,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const result = await authService.register(
      req.body.name,
      req.body.email,
      req.body.password,
    );
    res.json(result);
  } catch (err) {
    return next(err);
  }
};
