import db from "../database.js";

export const getAllCategories = async () => {
    const sql = `
        SELECT *
        FROM categories
        ORDER BY name
    `;
    const result = await db.query(sql);
    return result.rows;
};

export const getCategoryById = async (id) => {
    const sql = `
        SELECT *
        FROM categories
        WHERE category_id = $1
    `;
    const result = await db.query(sql, [id]);
    return result.rows[0];
};

export const getProjectsByCategoryId = async (id) => {
    const sql = `
        SELECT
            p.project_id,
            p.name,
            p.description,
            p.organization_id,
            p.category_id
        FROM projects p
        WHERE p.category_id = $1
        ORDER BY p.name
    `;
    const result = await db.query(sql, [id]);
    return result.rows;
};

export const insertCategory = async (name) => {
    const sql = `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *
    `;
    const result = await db.query(sql, [name]);
    return result.rows[0];
};

export const updateCategoryById = async (id, name) => {
    const sql = `
        UPDATE categories
        SET name = $1
        WHERE category_id = $2
        RETURNING *
    `;
    const result = await db.query(sql, [name, id]);
    return result.rows[0];
};