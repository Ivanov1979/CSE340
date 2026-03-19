import pool from "../database.js";

export async function getAllProjects() {
    const result = await pool.query(`
        SELECT p.*, o.name AS organization_name, c.name AS category_name
        FROM projects p
        LEFT JOIN organization o ON p.organization_id = o.organization_id
        LEFT JOIN categories c ON p.category_id = c.category_id
        ORDER BY p.name
    `);
    return result.rows;
}