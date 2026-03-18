import db from "../database.js";

export async function getAllOrganizations() {
    try {
        const result = await db.query(
            "SELECT * FROM organization ORDER BY organization_id"
        );
        return result.rows;
    } catch (error) {
        console.error("Error fetching organizations:", error.message);
        throw error;
    }
}

export async function getAllCategories() {
    try {
        const result = await db.query(
            "SELECT * FROM category ORDER BY category_id"
        );
        return result.rows;
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        throw error;
    }
}

export async function getAllProjects() {
    try {
        const result = await db.query(`
      SELECT
        p.project_id,
        p.name,
        p.description,
        p.start_date,
        o.name AS organization_name,
        c.name AS category_name
      FROM project p
      JOIN organization o
        ON p.organization_id = o.organization_id
      JOIN category c
        ON p.category_id = c.category_id
      ORDER BY p.project_id
    `);
        return result.rows;
    } catch (error) {
        console.error("Error fetching projects:", error.message);
        throw error;
    }
}