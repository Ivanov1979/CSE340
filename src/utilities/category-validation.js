import { body, validationResult } from "express-validator";

export const categoryRules = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Category name is required.")
            .isLength({ min: 3, max: 100 })
            .withMessage("Category name must be between 3 and 100 characters.")
    ];
};

export const checkCategoryData = async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const categoryId = req.params.id || null;
    const title = categoryId ? "Edit Category" : "New Category";
    const view = categoryId ? "edit-category" : "new-category";

    const category = {
        category_id: categoryId,
        name: req.body.name
    };

    return res.status(400).render(view, {
        title,
        errors: errors.array(),
        category
    });
};