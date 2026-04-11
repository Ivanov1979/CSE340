import db from "../database.js";

export const getAllProjects = async () => {
    const result = await db.query(`
        SELECT 
            p.project_id,
            p.name,
            p.description,
            p.location,
            p.start_date,
            p.organization_id,
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
            p.location,
            p.start_date,
            p.organization_id,
            o.name AS organization_name
        FROM projects p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1
    `, [id]);

    return result.rows[0];
};

export const insertProject = async ({
    name,
    description,
    location,
    start_date,
    organization_id
}) => {
    const sql = `
        INSERT INTO projects (
            name,
            description,
            location,
            start_date,
            organization_id
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;

    const result = await db.query(sql, [
        name,
        description,
        location,
        start_date,
        organization_id
    ]);

    return result.rows[0];
};

export const updateProjectById = async (
    id,
    { name, description, location, start_date, organization_id }
) => {
    const sql = `
        UPDATE projects
        SET
            name = $1,
            description = $2,
            location = $3,
            start_date = $4,
            organization_id = $5
        WHERE project_id = $6
        RETURNING *
    `;

    const result = await db.query(sql, [
        name,
        description,
        location,
        start_date,
        organization_id,
        id
    ]);

    return result.rows[0];
};

export const getAllOrganizations = async () => {
    const result = await db.query(`
        SELECT organization_id, name
        FROM organization
        ORDER BY name
    `);

    return result.rows;
};

export const getAllCategories = async () => {
    const result = await db.query(`
        SELECT category_id, name
        FROM categories
        ORDER BY name
    `);

    return result.rows;
};

export const getAllCategoriesForProjectAssignment = async () => {
    const result = await db.query(`
        SELECT 
            category_id,
            name
        FROM categories
        ORDER BY name
    `);

    return result.rows;
};

export const getAssignedCategoryIdsByProjectId = async (projectId) => {
    const result = await db.query(`
        SELECT 
            category_id
        FROM project_categories
        WHERE project_id = $1
        ORDER BY category_id
    `, [projectId]);

    return result.rows.map(row => row.category_id);
};

export const replaceProjectCategories = async (projectId, categoryIds) => {
    await db.query(`
        DELETE FROM project_categories
        WHERE project_id = $1
    `, [projectId]);

    for (const categoryId of categoryIds) {
        await db.query(`
            INSERT INTO project_categories (
                project_id,
                category_id
            )
            VALUES ($1, $2)
        `, [projectId, categoryId]);
    }
};

export const getCategoriesByProjectId = async (projectId) => {
    const result = await db.query(`
        SELECT 
            c.category_id,
            c.name
        FROM project_categories pc
        JOIN categories c
            ON pc.category_id = c.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name
    `, [projectId]);

    return result.rows;
};