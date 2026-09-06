import express from "express";
import verifyAuth from "../middleware/authMiddleware";
import {
  getAllArticlesController,
  getArticleByIdController,
  createArticleController,
  updateArticleController,
} from "../controller/article.controller";

const router = express.Router();

router.get("/", getAllArticlesController);
router.post("/", verifyAuth, createArticleController);
router.get("/:id", getArticleByIdController);
router.put("/:id", verifyAuth, updateArticleController);

export default router;
