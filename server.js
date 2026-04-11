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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

app.get("/test-db", async (req, res, next) => {
    try {
        const result = await db.query("SELECT NOW() as current_time");
        res.send(`Database works! Current time: ${result.rows[0].current_time}`);
    } catch (error) {
        next(error);
    }
});

app.use("/organizations", organizationRoutes);
app.use("/projects", projectRoutes);
app.use("/categories", categoryRoutes);

app.use((req, res) => {
    res.status(404).render("errors/404", {
        title: "404 Not Found"
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Server Error");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Environment: ${nodeEnv}`);
});