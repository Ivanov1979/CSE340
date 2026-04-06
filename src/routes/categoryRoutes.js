import express from "express";
import {
    buildCategories,
    buildCategoryDetail,
    buildNewCategory,
    createCategory,
    buildEditCategory,
    updateCategory
} from "../controllers/categoryController.js";

import {
    categoryRules,
    checkCategoryData
} from "../utilities/category-validation.js";

const router = express.Router();

router.get("/", buildCategories);
router.get("/new-category", buildNewCategory);
router.post("/new-category", categoryRules(), checkCategoryData, createCategory);
router.get("/edit-category/:id", buildEditCategory);
router.post("/edit-category/:id", categoryRules(), checkCategoryData, updateCategory);
router.get("/:id", buildCategoryDetail);

export default router;