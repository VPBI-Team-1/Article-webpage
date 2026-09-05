import express from "express";
import {
    getAllArticlesController,
    getArticleByIdController,
} from "../controller/article.controller";

const router = express.Router();

router.get("/", getAllArticlesController);
router.get("/:id", getArticleByIdController);

export default router;
