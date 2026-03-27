import pkg from "pg";
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL || process.env.DB_URL;

const db = connectionString
    ? new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
    })
    : new Pool({
        user: "ivanov",
        host: "/tmp",
        database: "cse340",
        port: 5432
    });

export default db;