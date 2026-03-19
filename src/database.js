import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
    user: "ivanov",
    host: "/tmp",
    database: "cse340",
    port: 5432
});

export default db;