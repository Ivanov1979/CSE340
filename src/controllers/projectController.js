import {
    getAllProjects,
    getProjectById,
    getCategoriesByProjectId
} from "../models/project-model.js";

export async function buildProjects(req, res, next) {
    try {
        const projects = await getAllProjects();

        res.render("projects", {
            title: "Projects",
            projects
        });
    } catch (error) {
        next(error);
    }
}

export async function buildProjectDetail(req, res, next) {
    try {
        const projectId = req.params.id;

        const project = await getProjectById(projectId);
        const categories = await getCategoriesByProjectId(projectId);

        if (!project) {
            return res.status(404).render("errors/404", {
                title: "Project Not Found"
            });
        }

        res.render("project-detail", {
            ttitle: project.name,
            project,
            categories
        });
    } catch (error) {
        next(error);
    }
}