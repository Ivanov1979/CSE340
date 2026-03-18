import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "./src/database.js";
import {
    getAllOrganizations,
    getAllProjects,
    getAllCategories
} from "./src/models/siteModel.js";

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

app.get("/organizations", async (req, res) => {
    try {
        const organizations = await getAllOrganizations();
        res.render("organizations", {
            title: "Our Partner Organizations",
            organizations
        });
    } catch (error) {
        console.error("Organizations route error:", error.message);
        res.status(500).send("Error loading organizations.");
    }
});

app.get("/projects", async (req, res) => {
    try {
        const projects = await getAllProjects();
        res.render("projects", {
            title: "Service Projects",
            projects
        });
    } catch (error) {
        console.error("Projects route error:", error.message);
        res.status(500).send("Error loading projects.");
    }
});

app.get("/categories", async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.render("categories", {
            title: "Service Project Categories",
            categories
        });
    } catch (error) {
        console.error("Categories route error:", error.message);
        res.status(500).send("Error loading categories.");
    }
});

app.get("/test-db", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW() as current_time");
        res.send(`Database works! Current time: ${result.rows[0].current_time}`);
    } catch (error) {
        console.error("Database route error:", error.message);
        res.status(500).send("Database connection failed.");
    }
});

app.use((req, res) => {
    res.status(404).render("404", { title: "Page Not Found" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Environment: ${nodeEnv}`);
});