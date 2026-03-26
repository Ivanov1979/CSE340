import express from "express";
import {
    buildProjects,
    buildProjectDetail
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", buildProjects);
router.get("/:id", buildProjectDetail);

export default router;