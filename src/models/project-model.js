import db from "../database.js";

export const getAllProjects = async () => {
    const result = await db.query(`
        SELECT 
            p.project_id,
            p.name,
            p.description,
            p.organization_id,
            p.category_id,
            o.name AS organization_name
        FROM projects p
        JOIN organization o
            ON p.organization_id = o.organization_id
        ORDER BY p.name
    `);
    return result.rows;
};

export const getProjectById = async (id) => {
    const result = await db.query(`
        SELECT 
            p.project_id,
            p.name,
            p.description,
            p.organization_id,
            p.category_id,
            o.name AS organization_name
        FROM projects p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1
    `, [id]);

    return result.rows[0];
};