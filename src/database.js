import pkg from "pg";
const { Pool } = pkg;

const db = new Pool(
    process.env.DATABASE_URL
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        }
        : {
            user: "ivanov",
            host: "/tmp",
            database: "cse340",
            port: 5432
        }
);

export default db;