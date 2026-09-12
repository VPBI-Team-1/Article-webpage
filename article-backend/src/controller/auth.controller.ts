import express from "express";
import * as authService from "../service/auth.service";

export const registerController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const result = await authService.register(req.body);
    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const loginController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const result = await authService.login(req.body, res);
    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const logoutController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const result = await authService.logout(res);
    res.json(result);
  } catch (err) {
    return next(err);
  }
};
