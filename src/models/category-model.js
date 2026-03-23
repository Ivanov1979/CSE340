import pool from "../database.js";

export async function getAllCategories() {
    const result = await pool.query(`
        SELECT category_id, name
        FROM categories
        ORDER BY name
    `);
    return result.rows;
}

export async function getCategoryById(categoryId) {
    const result = await pool.query(`
        SELECT category_id, name
        FROM categories
        WHERE category_id = $1
    `, [categoryId]);
    return result.rows[0];
}

export async function getProjectsByCategoryId(categoryId) {
    const result = await pool.query(`
        SELECT project_id, name
        FROM projects
        WHERE category_id = $1
        ORDER BY name
    `, [categoryId]);
    return result.rows;
}