import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { Pool, QueryResult } from "pg";

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  database: process.env.DB_DATABASE,
});

export const query = (
  text: string,
  params?: unknown[]
): Promise<QueryResult> => {
  return pool.query(text, params);
};

export default {
  query,
};
