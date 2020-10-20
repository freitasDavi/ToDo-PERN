import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  // password: "123",
  password: "5d034ee699cc4bc9ac6c48479463f9d9",
  host: "localhost",
  database: "pernstack",
  port: 5432,
});

export default pool;
