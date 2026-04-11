import db from "../database.js";

export const getAllOrganizations = async () => {
    const result = await db.query(
        "SELECT * FROM organization ORDER BY name"
    );
    return result.rows;
};

export const getOrganizationById = async (id) => {
    const result = await db.query(
        "SELECT * FROM organization WHERE organization_id = $1",
        [id]
    );
    return result.rows[0];
};

export const insertOrganization = async ({
    name,
    description,
    contact_email,
    logo_filename
}) => {
    const sql = `
        INSERT INTO organization
        (name, description, contact_email, logo_filename)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    const result = await db.query(sql, [
        name,
        description,
        contact_email,
        logo_filename
    ]);

    return result.rows[0];
};

export const updateOrganizationById = async (
    id,
    { name, description, contact_email, logo_filename }
) => {
    const sql = `
        UPDATE organization
        SET name = $1,
            description = $2,
            contact_email = $3,
            logo_filename = $4
        WHERE organization_id = $5
        RETURNING *
    `;

    const result = await db.query(sql, [
        name,
        description,
        contact_email,
        logo_filename,
        id
    ]);

    return result.rows[0];
};