import express from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;
export default function verifyAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  if (!SECRET_KEY) {
    return res.status(404).send("Secret key undefined");
  }
  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);

    (req as any).user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
}
