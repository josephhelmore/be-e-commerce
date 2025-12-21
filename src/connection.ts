import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

const ENV = process.env.NODE_ENV || "production";
dotenv.config({ path: `.env.${ENV}` });

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is not set");
}

const client = postgres(url, {
  ssl: "require",
  max: 1,
});

console.log("Connecting to DB:", process.env.DATABASE_URL);


export const db = drizzle(client);

