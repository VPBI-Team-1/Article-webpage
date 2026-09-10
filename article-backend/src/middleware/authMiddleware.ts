import express from "express";
import jwt from "jsonwebtoken";

// Global declaration merging to strongly type req.user across Express handlers
declare global {
  namespace Express {
    interface Request {
      user?: {
        payload: {
          userId: number;
          name: string;
          email: string;
        };
        iat: number;
        exp: number;
      };
    }
  }
}

const SECRET_KEY = process.env.JWT_SECRET;
export default function verifyAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!SECRET_KEY) {
    return res.status(500).json({ message: "Secret key undefined" });
  }
  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);

    (req as any).user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
}
