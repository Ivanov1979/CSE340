import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "./src/database.js";

import organizationRoutes from "./src/routes/organizationRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || "development";

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

app.use("/organizations", organizationRoutes);
app.use("/projects", projectRoutes);
app.use("/categories", categoryRoutes);

app.get("/test-db", async (req, res, next) => {
    try {
        const result = await db.query("SELECT NOW() as current_time");
        res.send(`Database works! Current time: ${result.rows[0].current_time}`);
    } catch (error) {
        next(error);
    }
});

app.get("/setup-db", async (req, res) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS categories (
                category_id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS organization (
                organization_id SERIAL PRIMARY KEY,
                name VARCHAR(150) NOT NULL,
                description TEXT NOT NULL,
                contact_email VARCHAR(255) NOT NULL,
                logo_filename VARCHAR(255) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS projects (
                project_id SERIAL PRIMARY KEY,
                name VARCHAR(150) NOT NULL,
                description TEXT NOT NULL,
                organization_id INT REFERENCES organization(organization_id),
                category_id INT REFERENCES categories(category_id)
            );
        `);

        await db.query(`
            INSERT INTO categories (name)
            SELECT 'Education'
            WHERE NOT EXISTS (
                SELECT 1 FROM categories WHERE name = 'Education'
            );

            INSERT INTO categories (name)
            SELECT 'Health'
            WHERE NOT EXISTS (
                SELECT 1 FROM categories WHERE name = 'Health'
            );

            INSERT INTO categories (name)
            SELECT 'Environment'
            WHERE NOT EXISTS (
                SELECT 1 FROM categories WHERE name = 'Environment'
            );
        `);

        res.send("Database setup complete ✅");
    } catch (error) {
        console.error(error);
        res.send("Error setting up database ❌");
    }
});

app.use((req, res) => {
    res.status(404).render("errors/404", { title: "Page Not Found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("errors/500", { title: "Server Error" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Environment: ${nodeEnv}`);
});