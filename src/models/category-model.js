import db from "../database.js";

export const getAllCategories = async () => {
    const result = await db.query("SELECT * FROM categories ORDER BY name");
    return result.rows;
};

export const getCategoryById = async (id) => {
    const result = await db.query(
        "SELECT * FROM categories WHERE category_id = $1",
        [id]
    );
    return result.rows[0];
};

export const getProjectsByCategoryId = async (id) => {
    const result = await db.query(`
        SELECT 
            p.project_id,
            p.name,
            p.description,
            p.organization_id,
            p.category_id
        FROM projects p
        WHERE p.category_id = $1
        ORDER BY p.name
    `, [id]);

    return result.rows;
};