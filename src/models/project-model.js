import pool from "../database.js";

export async function getAllProjects() {
    const result = await pool.query(`
        SELECT p.project_id, p.name, p.description, p.organization_id, p.category_id,
               o.name AS organization_name
        FROM projects p
        LEFT JOIN organization o
          ON p.organization_id = o.organization_id
        ORDER BY p.name
    `);
    return result.rows;
}

export async function getProjectById(projectId) {
    const result = await pool.query(`
        SELECT p.project_id, p.name, p.description, p.organization_id, p.category_id,
               o.name AS organization_name
        FROM projects p
        LEFT JOIN organization o
          ON p.organization_id = o.organization_id
        WHERE p.project_id = $1
    `, [projectId]);
    return result.rows[0];
}

export async function getCategoriesByProjectId(projectId) {
    const result = await pool.query(`
        SELECT c.category_id, c.name
        FROM categories c
        JOIN projects p
          ON c.category_id = p.category_id
        WHERE p.project_id = $1
    `, [projectId]);
    return result.rows;
}