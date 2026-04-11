import db from "../database.js";

export const getAllCategories = async () => {
    const sql = `
        SELECT category_id, name
        FROM categories
        ORDER BY name
    `;
    const result = await db.query(sql);
    return result.rows;
};

export const getCategoryById = async (id) => {
    const sql = `
        SELECT category_id, name
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
            p.location,
            p.start_date,
            p.organization_id,
            o.name AS organization_name
        FROM project_categories pc
        JOIN projects p
            ON pc.project_id = p.project_id
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE pc.category_id = $1
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