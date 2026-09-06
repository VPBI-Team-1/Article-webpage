import express from "express";
import verifyAuth from "../middleware/authMiddleware";
import {
  getAllArticlesController,
  getArticleByIdController,
  createArticleController,
  updateArticleController,
  deleteArticleController,
} from "../controller/article.controller";

const router = express.Router();

router.get("/", getAllArticlesController);
router.post("/", verifyAuth, createArticleController);
router.get("/:id", getArticleByIdController);
router.put("/:id", verifyAuth, updateArticleController);
router.delete("/:id", verifyAuth, deleteArticleController);

export default router;
