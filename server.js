import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const NODE_ENV = "production";
const PORT = 3000;

const app = express();

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files (public)
app.use(express.static(path.join(__dirname, "public")));

// EJS config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.get("/", (req, res) => {
    res.render("index", { title: "Home Page" });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});