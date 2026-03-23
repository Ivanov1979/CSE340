import express from "express";
import {
    buildCategories,
    buildCategoryDetail
} from "../controllers/categoryController.js";

const router = express.Router();

// GET all categories
router.get("/categories", buildCategories);

// GET single category detail
router.get("/category/:id", buildCategoryDetail);

export default router;