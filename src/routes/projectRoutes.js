import express from "express";
import {
    buildProjects,
    buildProjectDetail,
    buildAssignCategories,
    updateProjectCategories
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", buildProjects);

router.get("/:id/categories", buildAssignCategories);
router.post("/:id/categories", updateProjectCategories);

router.get("/:id", buildProjectDetail);

export default router;