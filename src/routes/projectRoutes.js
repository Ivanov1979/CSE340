import express from "express";
import {
    buildProjects,
    buildProjectDetail
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/projects", buildProjects);
router.get("/project/:id", buildProjectDetail);

export default router;