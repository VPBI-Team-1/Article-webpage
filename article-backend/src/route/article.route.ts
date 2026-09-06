import express from "express";
import verifyAuth from "../middleware/authMiddleware";
import {
  getAllArticlesController,
  getArticleByIdController,
  createArticleController,
} from "../controller/article.controller";

const router = express.Router();

router.get("/", getAllArticlesController);
router.post("/", verifyAuth, createArticleController);
router.get("/:id", getArticleByIdController);

export default router;
