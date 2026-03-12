import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db, { testConnection } from "./src/models/db.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || "development";

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.get("/", async (req, res) => {
    const title = "Home";
    res.render("home", { title });
});

app.get("/organizations", async (req, res) => {
    const title = "Our Partner Organizations";
    res.render("organizations", { title });
});

app.get("/projects", async (req, res) => {
    const title = "Service Projects";
    res.render("projects", { title });
});

app.get("/categories", async (req, res) => {
    const title = "Service Project Categories";
    res.render("categories", { title });
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

app.use(async (req, res) => {
    const title = "Page Not Found";
    res.status(404).render("404", { title });
});

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Environment: ${nodeEnv}`);

    try {
        await testConnection();
    } catch (error) {
        console.error("Startup database test failed:", error.message);
    }
});