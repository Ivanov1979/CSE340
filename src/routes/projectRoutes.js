import express from "express";
import {
    buildProjects,
    buildProjectDetail,
    buildAssignCategories,
    updateProjectCategories,
    buildNewProject,
    addNewProject,
    buildEditProject,
    updateProject
} from "../controllers/projectController.js";

const router = express.Router();

// list all projects
router.get("/", buildProjects);

// create new project
router.get("/new", buildNewProject);
router.post("/new", addNewProject);

// edit existing project
router.get("/:id/edit", buildEditProject);
router.post("/:id/edit", updateProject);

// assign categories
router.get("/:id/categories", buildAssignCategories);
router.post("/:id/categories", updateProjectCategories);

// project detail
router.get("/:id", buildProjectDetail);

export default router;