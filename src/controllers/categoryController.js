import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    insertCategory,
    updateCategoryById
} from "../models/category-model.js";

export const buildCategories = async (req, res, next) => {
    try {
        const categories = await getAllCategories();

        res.render("categories", {
            title: "Categories",
            categories,
            message: req.flash ? req.flash("success") : null
        });
    } catch (error) {
        next(error);
    }
};

export const buildCategoryDetail = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render("errors/404", {
                title: "Category Not Found"
            });
        }

        const projects = await getProjectsByCategoryId(categoryId);

        res.render("category-detail", {
            title: category.name,
            category,
            projects,
            message: req.flash ? req.flash("success") : null
        });
    } catch (error) {
        next(error);
    }
};

export const buildNewCategory = async (req, res, next) => {
    try {
        res.render("new-category", {
            title: "New Category",
            errors: [],
            category: {
                name: ""
            }
        });
    } catch (error) {
        next(error);
    }
};

export const createCategory = async (req, res, next) => {
    try {
        const name = req.body.name ? req.body.name.trim() : "";

        const errors = [];

        if (!name) {
            errors.push({ msg: "Category name is required." });
        }

        if (name.length > 100) {
            errors.push({ msg: "Category name must be 100 characters or fewer." });
        }

        if (errors.length > 0) {
            return res.status(400).render("new-category", {
                title: "New Category",
                errors,
                category: { name }
            });
        }

        const newCategory = await insertCategory(name);

        if (req.flash) {
            req.flash("success", "Category created successfully.");
        }

        res.redirect(`/categories/${newCategory.category_id}`);
    } catch (error) {
        next(error);
    }
};

export const buildEditCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render("errors/404", {
                title: "Category Not Found"
            });
        }

        res.render("edit-category", {
            title: "Edit Category",
            errors: [],
            category
        });
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const name = req.body.name ? req.body.name.trim() : "";

        const category = await getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render("errors/404", {
                title: "Category Not Found"
            });
        }

        const errors = [];

        if (!name) {
            errors.push({ msg: "Category name is required." });
        }

        if (name.length > 100) {
            errors.push({ msg: "Category name must be 100 characters or fewer." });
        }

        if (errors.length > 0) {
            return res.status(400).render("edit-category", {
                title: "Edit Category",
                errors,
                category: {
                    category_id: categoryId,
                    name
                }
            });
        }

        const updatedCategory = await updateCategoryById(categoryId, name);

        if (!updatedCategory) {
            return res.status(404).render("errors/404", {
                title: "Category Not Found"
            });
        }

        if (req.flash) {
            req.flash("success", "Category updated successfully.");
        }

        res.redirect(`/categories/${updatedCategory.category_id}`);
    } catch (error) {
        next(error);
    }
};