import db from "../database.js";

export const getAllOrganizations = async () => {
    const result = await db.query("SELECT * FROM organization ORDER BY name");
    return result.rows;
};

export const getOrganizationById = async (id) => {
    const result = await db.query(
        "SELECT * FROM organization WHERE organization_id = $1",
        [id]
    );
    return result.rows[0];
};