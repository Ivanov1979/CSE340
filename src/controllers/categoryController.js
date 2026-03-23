import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
} from "../models/category-model.js";

export async function buildCategories(req, res, next) {
    try {
        const categories = await getAllCategories();

        res.render("categories", {
            title: "Categories",
            categories
        });
    } catch (error) {
        next(error);
    }
}

export async function buildCategoryDetail(req, res, next) {
    try {
        const categoryId = req.params.id;

        const category = await getCategoryById(categoryId);
        const projects = await getProjectsByCategoryId(categoryId);

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
}