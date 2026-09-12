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

export const updateProfileController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const userId = (req as any).user.payload.userId;
    const { name, email, password } = req.body;

    // Validation: prevent empty fields if provided
    if (name !== undefined && name.trim() === "") {
      const error = new Error("Name cannot be empty");
      (error as any).status = 400;
      throw error;
    }
    if (email !== undefined && email.trim() === "") {
      const error = new Error("Email cannot be empty");
      (error as any).status = 400;
      throw error;
    }
    if (password !== undefined && password.trim() === "") {
      const error = new Error("Password cannot be empty");
      (error as any).status = 400;
      throw error;
    }

    const result = await authService.updateProfile(userId, { name, email, password });
    res.json({
      message: "Profile updated successfully",
      user: result,
    });
  } catch (err) {
    return next(err);
  }
};

