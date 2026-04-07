import {
    getAllProjects,
    getProjectById,
    getAllCategoriesForProjectAssignment,
    getAssignedCategoryIdsByProjectId,
    replaceProjectCategories,
    getCategoriesByProjectId
} from "../models/project-model.js";

export const buildProjects = async (req, res, next) => {
    try {
        const projects = await getAllProjects();

        res.render("projects", {
            title: "Projects",
            projects,
            message: req.flash ? req.flash("success") : null
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

        const categories = await getCategoriesByProjectId(id);

        res.render("project-detail", {
            title: project.name,
            project,
            categories,
            message: req.flash ? req.flash("success") : null
        });
    } catch (error) {
        next(error);
    }
};

export const buildAssignCategories = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const project = await getProjectById(projectId);

        if (!project) {
            return res.status(404).render("errors/404", {
                title: "Project Not Found"
            });
        }

        const categories = await getAllCategoriesForProjectAssignment();
        const assignedCategoryIds = await getAssignedCategoryIdsByProjectId(projectId);

        res.render("assign-categories", {
            title: "Assign Categories",
            project,
            categories,
            assignedCategoryIds,
            errors: [],
            message: req.flash ? req.flash("success") : null
        });
    } catch (error) {
        next(error);
    }
};

export const updateProjectCategories = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const project = await getProjectById(projectId);

        if (!project) {
            return res.status(404).render("errors/404", {
                title: "Project Not Found"
            });
        }

        let { categoryIds } = req.body;

        if (!categoryIds) {
            categoryIds = [];
        } else if (!Array.isArray(categoryIds)) {
            categoryIds = [categoryIds];
        }

        const cleanedCategoryIds = categoryIds
            .map(id => Number(id))
            .filter(id => !Number.isNaN(id));

        await replaceProjectCategories(projectId, cleanedCategoryIds);

        if (req.flash) {
            req.flash("success", "Project categories updated successfully.");
        }

        res.redirect(`/projects/${projectId}`);
    } catch (error) {
        next(error);
    }
};