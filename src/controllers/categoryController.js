import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
} from "../models/category-model.js";

export const buildCategories = async (req, res, next) => {
    try {
        const categories = await getAllCategories();

        res.render("categories", {
            title: "Categories",
            categories
        });
    } catch (error) {
        next(error);
    }
};

export const buildCategoryDetail = async (req, res, next) => {
    try {
        const id = req.params.id;

        const category = await getCategoryById(id);
        const projects = await getProjectsByCategoryId(id);

        if (!category) {
            return res.status(404).render("errors/404", {
                title: "Category Not Found"
            });
        }

        res.render("category-detail", {
            title: category.name,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
};