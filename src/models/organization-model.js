import pool from "../database.js";

export async function getAllOrganizations() {
    const result = await pool.query(`
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM organization
        ORDER BY name
    `);
    return result.rows;
}

export async function getOrganizationById(organizationId) {
    const result = await pool.query(`
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM organization
        WHERE organization_id = $1
    `, [organizationId]);
    return result.rows[0];
}

export async function getProjectsByOrganizationId(organizationId) {
    const result = await pool.query(`
        SELECT project_id, name
        FROM projects
        WHERE organization_id = $1
        ORDER BY name
    `, [organizationId]);
    return result.rows;
}