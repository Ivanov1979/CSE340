import express from "express";
import {
    buildCategories,
    buildCategoryDetail
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", buildCategories);
router.get("/:id", buildCategoryDetail);

export default router;