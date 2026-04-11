import {
    getAllProjects,
    getProjectById,
    getAllCategoriesForProjectAssignment,
    getAssignedCategoryIdsByProjectId,
    replaceProjectCategories,
    getCategoriesByProjectId,
    insertProject,
    updateProjectById,
    getAllOrganizations,
    getAllCategories
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

export const buildNewProject = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const categories = await getAllCategories();

        res.render("new-project", {
            title: "Add New Project",
            organizations,
            categories
        });
    } catch (error) {
        next(error);
    }
};

export const addNewProject = async (req, res, next) => {
    try {
        const { name, description, location, start_date, organization_id } = req.body;

        const newProject = await insertProject({
            name,
            description,
            location,
            start_date,
            organization_id
        });

        res.redirect(`/projects/${newProject.project_id}`);
    } catch (error) {
        next(error);
    }
};

export const buildEditProject = async (req, res, next) => {
    try {
        const id = req.params.id;
        const project = await getProjectById(id);

        if (!project) {
            return res.status(404).render("errors/404", {
                title: "Project Not Found"
            });
        }

        const organizations = await getAllOrganizations();
        const categories = await getAllCategories();

        res.render("edit-project", {
            title: `Edit ${project.name}`,
            project,
            organizations,
            categories
        });
    } catch (error) {
        next(error);
    }
};

export const updateProject = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, description, location, start_date, organization_id } = req.body;

        const updatedProject = await updateProjectById(id, {
            name,
            description,
            location,
            start_date,
            organization_id
        });

        if (!updatedProject) {
            return res.status(404).render("errors/404", {
                title: "Project Not Found"
            });
        }

        res.redirect(`/projects/${id}`);
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