import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "123",
  host: "localhost",
  database: "pernstack",
  port: 5432,
});

export default pool;
