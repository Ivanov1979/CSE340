import {
    getAllProjects,
    getProjectById
} from "../models/project-model.js";

export const buildProjects = async (req, res, next) => {
    try {
        const projects = await getAllProjects();

        res.render("projects", {
            title: "Projects",
            projects
        });
    } catch (error) {
        next(error);
    }
};

export const buildProjectDetail = async (req, res, next) => {
    try {
        const id = req.params.id;

        const project = await getProjectById(id);

        if (!project) {
            return res.status(404).render("errors/404", {
                title: "Project Not Found"
            });
        }

        res.render("project-detail", {
            title: project.name, // ✅ FIXED
            project
        });
    } catch (error) {
        next(error);
    }
};